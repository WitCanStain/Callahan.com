import React from "react";
import markers from "../../../../../_static/markers";
const L = require("react-leaflet");
import store from "../../../../../redux/store";
import { connect } from "react-redux";
import A from "../../../../../redux/actions.js";
import socket from "../../../../../_static/socket";
import U from "../../../useful_functions";
import { NoteAddon } from "./note-addon.js";

const getRequest = (requests, position) => {
  const signature = U.signature(position);
  let request = requests[signature];
  if (request == undefined) {
    // the request may have been moved, we need to find it
    request = Object.values(requests).find(
      (r) => JSON.stringify(r.position) == JSON.stringify(position),
    );
  }
  return request;
};

class RequestIcon_ extends React.Component {
  constructor(props) {
    super(props);
    this.markerRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(
        getRequest(this.props.requests, this.props.request.position),
      ) !=
      JSON.stringify(
        getRequest(nextProps.requests, this.props.request.position),
      )
    ) {
      return true;
    }
    if (JSON.stringify(this.props.zoom) != JSON.stringify(nextProps.zoom)) {
      return true;
    }
    return false;
  }

  get request() {
    return getRequest(this.props.requests, this.props.request.position);
  }

  get signature() {
    const request = this.request;
    if (request && request.key) return request.key;
    return U.signature(this.props.request.position);
  }

  SelectRequest() {
    store.dispatch(A.selectObject("requests", this.signature));
  }

  CheckCompleted() {
    const request = this.request;
    if (!request.done || request.done.length === 0) {
      return markers.RequestIcon.incomplete;
    }

    const combinedRequests = request.request.flat().reduce((acc, item) => {
      const accItem = acc.find(
        (accItem) =>
          accItem.catId === item.catid && accItem.itemId === item.itemid,
      );
      if (accItem) {
        accItem.crates += item.crates;
        return acc;
      }
      return [
        ...acc,
        { catId: item.catid, itemId: item.itemid, crates: item.crates },
      ];
    }, []);
    const totalLines = combinedRequests.reduce(
      (acc, item) => item.crates + acc,
      0,
    );
    const completedLines =
      totalLines -
      request.done
        .each((item) => {
          const requested = combinedRequests.find(
            (r) => r.catId === item.catid && r.itemId === item.itemId,
          );
          requested.crates = Math.max(0, requested.crates - item.crates);
        })
        .reduce((acc, item) => item.crates + acc, 0);
    const pct = completedLines / totalLines;

    if (pct < 0.33) {
      return markers.RequestIcon.incomplete;
    }
    if (pct < 0.66) {
      return markers.RequestIcon.early;
    }
    if (pct < 1) {
      return markers.RequestIcon.late;
    }
    return markers.RequestIcon.complete;
  }

  handleDragEnd(e) {
    let coords = e.target._latlng;
    const position = { x: coords.lng, y: coords.lat };
    let packet = {
      key: this.signature,
      position: position,
      lastupdate: new Date(),
    };
    store.dispatch(A.updateObject("requests", packet, this.signature));
    socket.emit("updateObject", {
      type: "requests",
      object: packet,
      key: this.signature,
    });
  }

  render() {
    //console.log("Rendering request")
    let request = this.props.request;
    let reqObj = getRequest(this.props.requests, request.position);
    let icon = this.CheckCompleted();
    return (
      <React.Fragment>
        {this.props.zoom > 3.5 && <NoteAddon obj={reqObj} />}
        <L.Marker
          ref={this.markerRef}
          position={[request.position.y, request.position.x]}
          icon={icon}
          onClick={() => this.SelectRequest()}
          draggable={true}
          onDragend={(e) => this.handleDragEnd(e)}
        ></L.Marker>
      </React.Fragment>
    );
  }
}

const mapStateToPropsRequests = (store) => {
  let privateinfo = store.private;
  return {
    requests: privateinfo.requests,
  };
};

export const RequestIcon = connect(mapStateToPropsRequests)(RequestIcon_);

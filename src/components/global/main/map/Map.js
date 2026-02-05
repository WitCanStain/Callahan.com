import React from "react";
import { IconPanel } from "../artycalc";
import contextmenu from "leaflet-contextmenu";
import { ContextDropdown } from "./context-menu";
import { BaseLayers } from "./baselayers";
import { SelectIcon } from "./controls";

const ReactDOM = require("react-dom");
const NativeL = require("leaflet");
import socket from "../../../../_static/socket";
import RegionImages from "../../../../_static/region-images";

const FullscreenControl = require("react-leaflet-fullscreen");
const LeafletControl = require("react-leaflet-control");
const L = require("react-leaflet");
import store from "../../../../redux/store";
import { connect } from "react-redux";
import U from "../../useful_functions";
import A from "../../../../redux/actions.js";
import { FilterPanel, MapIcons } from "./panel";
import * as MapControl from "./controls";
import "./map.scss";

class MapCore extends React.Component {
  convert(regionid, x, y) {
    return RegionImages.convert(regionid, x, y);
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log("Map props",this.props,nextProps)
    if (this.props.tab.tab != 0 && nextProps.tab.tab == 0) {
      return true;
    }
    if (
      (this.props.tab.tab == 7 && nextProps.tab.tab != 7) ||
      (this.props.tab.tab != 7 && nextProps.tab.tab == 7)
    ) {
      return true;
    }
    if (
      JSON.stringify(this.props.roominfo) != JSON.stringify(nextProps.roominfo)
    ) {
      return true;
    }
    return false;
  }

  render() {
    let labels = [];
    let regionlabels = [];
    let active = [];

    this.props.roominfo.dynamic.forEach((region, index) => {
      if (region.active) {
        active.push({
          regionId: region,
          active: true,
        });
      } else {
        active.push({
          regionId: region,
          active: false,
        });
      }
      for (
        var j = 0;
        j < this.props.roominfo.static[index].data.mapTextItems.length;
        j++
      ) {
        let obj = this.props.roominfo.static[index].data.mapTextItems[j];
        let position = this.convert(
          this.props.roominfo.static[index].regionId,
          obj.x,
          obj.y,
        );
        var myIcon = NativeL.divIcon({
          className: "my-div-icon",
          html: "<span class='maptext'><b>" + obj.text + "</b></span>",
        });
        myIcon.options.iconSize = [200, 20];
        myIcon.options.iconAnchor = [0, 0];
        myIcon.options.iconAnchor[0] = myIcon.options.iconSize[0] / 2;
        myIcon.options.iconAnchor[1] = myIcon.options.iconSize[1] / 2;
        let icon = <L.Marker position={position} icon={myIcon} />;
        labels.push(icon);
      }
    });
    //
    //
    //
    // for(var i =0;i<RegionImages.regionCounter && i < this.props.roominfo.dynamic.length ;i++){
    //   let region = this.props.roominfo.dynamic[i].regionId
    //   if(this.props.roominfo.dynamic[i].active){
    //     active.push({regionId:region,active:true})
    //   }else{
    //     active.push({regionId:region,active:false})
    //   }
    //
    //   for(var j=0;j<this.props.roominfo.static[i].data.mapTextItems.length;j++){
    //     let obj = this.props.roominfo.static[i].data.mapTextItems[j]
    //     let position = this.convert(this.props.roominfo.static[i].regionId,obj.x,obj.y);
    //     var myIcon = NativeL.divIcon({className: 'my-div-icon', html:"<span class='maptext'><b>"+obj.text+"</b></span>"});
    //     myIcon.options.iconSize=[200,20]
    //     myIcon.options.iconAnchor = [0,0]
    //     myIcon.options.iconAnchor[0]=myIcon.options.iconSize[0]/2;
    //     myIcon.options.iconAnchor[1]=myIcon.options.iconSize[1]/2;
    //     let icon = <L.Marker position={position} icon={myIcon} />
    //     labels.push(icon)
    //   }
    // }

    for (let i = 0; i < RegionImages.regionlist.length; i++) {
      let region = RegionImages.regionlist[i];
      if (region.name != "") {
        var myIcon = NativeL.divIcon({
          className: "my-div-icon",
          html: "<span class='regiontext'><b>" + region.name + "</b></span>",
        });
        myIcon.options.iconSize = [80, 30];
        myIcon.options.iconAnchor = [0, 0];
        myIcon.options.iconAnchor[0] = myIcon.options.iconSize[0] / 2;
        myIcon.options.iconAnchor[1] = myIcon.options.iconSize[1] / 2;
        let icon = (
          <L.Marker
            position={region.center}
            icon={myIcon}
            zIndexOffset={40000}
          ></L.Marker>
        );
        regionlabels.push(icon);
      }
    }
    //RENDER REQUESTS
    let info = {
      labels: labels,
      regionlabels: regionlabels,
      active: active,
    };
    return <GlobalMap info={info} tab={this.props.tab.tab} />;
  }
}

//////////////////////////////////////////////////////////
class GlobalMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {},
      zoom: 1,
    };

    this.HandleZoom = this.HandleZoom.bind(this);
    //this.SetRequest = this.SetRequest.bind(this);
    this.PanRegion = this.PanRegion.bind(this);
  }

  componentDidMount() {
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_squad_dropdown = obj;
        }}
        type={0}
      />,
      document.getElementById("context_squad_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_objectives_dropdown = obj;
        }}
        type={1}
      />,
      document.getElementById("context_objectives_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_relics_dropdown = obj;
        }}
        type={2}
      />,
      document.getElementById("context_relics_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_ships_dropdown = obj;
        }}
        type={3}
      />,
      document.getElementById("context_ships_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_logi_vehicles_dropdown = obj;
        }}
        type={4}
      />,
      document.getElementById("context_logi_vehicles_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_sections_dropdown = obj;
        }}
        type={5}
      />,
      document.getElementById("context_sections_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_facilities_dropdown = obj;
        }}
        type={6}
      />,
      document.getElementById("context_facilities_dropdown"),
    );
    ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_bunkers_dropdown = obj;
        }}
        type={7}
      />,
      document.getElementById("context_bunkers_dropdown"),
    );
	ReactDOM.render(
      <ContextDropdown
        ref={(obj) => {
          this.refs.context_airplanes_dropdown = obj;
        }}
        type={8}
      />,
      document.getElementById("context_airplanes_dropdown"),
    );
  }

  PanRegion(regionId) {
    var zoom = 4;
    this.refs.worldmap.leafletElement.setView(
      RegionImages.regionlist[regionId].center,
      zoom,
    );
  }

  HandleZoom(zoom) {
    this.setState({
      zoom: zoom,
    });
  }

  CreateMiscIcon(event, type) {
    let packet = {
      position: {
        x: event.latlng.lng,
        y: event.latlng.lat,
      },
      notes: "",
      type: type,
      lastupdate: new Date(),
    };
    let key = U.signature(packet.position);
    store.dispatch(A.updateObject("misc_icon", packet, key));
    socket.emit("updateObject", {
      type: "misc_icon",
      object: packet,
      key: key,
    });
  }

  CreateFob(event) {
    let packet = {
      position: {
        x: event.latlng.lng,
        y: event.latlng.lat,
      },
      side: 0,
      level: 0,
      notes: "",
      stockpile: {},
      lastupdate: new Date(),
    };
    let key = U.signature(packet.position);
    store.dispatch(A.updateObject("fobs", packet, key));
    socket.emit("updateObject", {
      type: "fobs",
      object: packet,
      key: key,
    });
  }

  OpenMenu(event, id, type) {
    let menu = document.getElementById(id);
    if (menu.classList.contains("show")) {
      menu.setAttribute("class", "dropdown-menu");
      this.refs[id].CreateIcon(
        event,
        this.refs.worldmap.leafletElement.contextmenu,
      );
    } else {
      menu.setAttribute("class", "dropdown-menu show");
    }
  }

  render() {
    if (this.props.tab == 7) {
      return null;
    }
    const bounds = RegionImages.bounds;
    if (this.refs.worldmap != undefined) {
      this.refs.worldmap.leafletElement.invalidateSize();
    }

    return (
      <React.Fragment>
        <L.Map
          ref="worldmap"
          onZoomend={(event) => {
            this.HandleZoom(event.target._zoom);
          }}
          center={[bounds[1][0] / 2, bounds[1][1] / 2]}
          bounds={bounds}
          crs={NativeL.CRS.Simple}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
          minZoom={1}
          maxZoom={7}
          zoomDelta={0.5}
          zoomSnap={0.5}
          attributionControl={false}
          contextmenu={true}
          contextmenuWidth={254}
          contextmenuItems={[
            {
              text: "Logi Request",
              icon: "/img/truckmove.png",
              callback: (event) =>
                window.requestmodalcontainer.ShowModal(event, 0),
            },
            {
              text: "Enemy",
              icon: "/img/Indicator_queue.png",
              callback: (event) => this.CreateMiscIcon(event, 1),
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Logi Vehicles</span>  <div class="dropdown-menu" id="context_logi_vehicles_dropdown"></div></div> ',
              icon: "/img/ConstructionVehicleIcon.png",
              callback: (event) =>
                this.OpenMenu(event, "context_logi_vehicles_dropdown", 4),
              hideOnSelect: false,
            },
            {
              text: "Move",
              icon: "/img/move.png",
              callback: (event) => this.CreateMiscIcon(event, 4),
            },
            {
              text: "FOB / BB",
              icon: "/img/MapIconForwardBase1.png?1554666597044",
              callback: this.CreateFob,
            },
            {
              text: "Attack",
              icon: "/img/attack.png",
              callback: (event) => this.CreateMiscIcon(event, 2),
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Squads</span>  <div class="dropdown-menu" id="context_squad_dropdown"></div></div> ',
              icon: "/img/glitch/1s.png",
              hideOnSelect: false,
              callback: (event) =>
                this.OpenMenu(event, "context_squad_dropdown", 0),
            },
            {
              text: "Defend",
              icon: "/img/defend.png",
              callback: (event) => this.CreateMiscIcon(event, 3),
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Objectives</span>  <div class="dropdown-menu" id="context_objectives_dropdown"></div></div> ',
              icon: "/img/glitch/Objective1.png",
              callback: (event) =>
                this.OpenMenu(event, "context_objectives_dropdown", 1),
              hideOnSelect: false,
            },
            {
              text: "Build",
              icon: "/img/build.png",
              callback: (event) => this.CreateMiscIcon(event, 7),
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Ships</span>  <div class="dropdown-menu" id="context_ships_dropdown"></div></div> ',
              icon: "/img/Shipyard.png",
              callback: (event) =>
                this.OpenMenu(event, "context_ships_dropdown", 3),
              hideOnSelect: false,
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Trains</span>  <div class="dropdown-menu" id="context_relics_dropdown"></div></div> ',
              icon: "/img/TrainEngineVehicleIcon.png",
              callback: (event) =>
                this.OpenMenu(event, "context_relics_dropdown", 2),
              hideOnSelect: false,
            },
            {
              text: "Note",
              icon: "/img/Note.png",
              callback: (event) => this.CreateMiscIcon(event, 0),
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Sections</span>  <div class="dropdown-menu" id="context_sections_dropdown"></div></div> ',
              icon: "/img/82dk_regiment.png",
              callback: (event) =>
                this.OpenMenu(event, "context_sections_dropdown", 5),
              hideOnSelect: false,
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Facilities</span>  <div class="dropdown-menu" id="context_facilities_dropdown"></div></div> ',
              icon: "/img/TunnelNetworkStructureIcon.png",
              callback: (event) =>
                this.OpenMenu(event, "context_facilities_dropdown", 6),
              hideOnSelect: false,
            },
            {
              text: '<div class="dropup"><span class="dropdown-toggle" >Bunkers</span>  <div class="dropdown-menu" id="context_bunkers_dropdown"></div></div> ',
              icon: "/img/FortT1BaseIcon.png",
              callback: (event) =>
                this.OpenMenu(event, "context_bunkers_dropdown", 7),
              hideOnSelect: false,
            },
			{
			  text: '<div class="dropup"><span class="dropdown-toggle" >Bunkers</span>  <div class="dropdown-menu" id="context_airplanes_dropdown"></div></div> ',
              icon: "/img/IconFilterAircraft.png",
              callback: (event) =>
                this.OpenMenu(event, "context_airplanes_dropdown", 8),
              hideOnSelect: false,
			},
          ]}
        >
          <BaseLayers checked={this.state.satmap} />

          <L.Pane name="backgroundpane">
            <L.Rectangle
              color="#333"
              fillOpacity=".95"
              weight={1}
              bounds={[
                [-549.538, -265.846],
                [93.538, 521.846],
              ]}
            />
          </L.Pane>

          <L.Pane name="toppane"></L.Pane>
          <LeafletControl.default
            position="topleft"
            className="leaflet_control_filterpanel"
          >
            <div id="mapcontainer_toppanel">
              <div id="mapcontainer_toppanel_filters">
                <FilterPanel />
                {/*<MapControl.Layers info={this.props.info} icons={this.props.icons} miscicons={miscicons}
          zoom={this.state.zoom} ToggleSatMap={this.ToggleSatMap} satmapOn={this.state.satmap}
    ToggleRanges={this.ToggleRanges} renderRanges={this.state.renderRanges}/>*/}
              </div>
              <div id="mapcontainer_toppanel_regionpan">
                <MapControl.RegionPan PanRegion={this.PanRegion} />
              </div>
            </div>
          </LeafletControl.default>
          <FullscreenControl
            position="topleft"
            content="<img src='/img/glitch/fullscreen-aaaaaa.png' />"
          />
          <L.AttributionControl position="bottomright" prefix={false} />
          <L.LayerGroup>
            {this.state.zoom == 1 ? this.props.info.regionlabels : null}
          </L.LayerGroup>
          {
            <L.LayerGroup>
              {this.state.zoom >= 5 ? this.props.info.labels : null}
            </L.LayerGroup>
          }
          <LeafletControl.default
            position="bottomright"
            className="leaflet_control_arty"
          >
            <IconPanel worldmap={this} />
          </LeafletControl.default>
          <MapControl.HexGrid />
          <MapControl.GridLines zoom={this.state.zoom} />
          <MapIcons zoom={this.state.zoom} />
          <MapControl.RLDComp zoom={this.state.zoom} />
          <SelectIcon
            ref={(e) => {
              window.selecticon = e;
            }}
          />
        </L.Map>
      </React.Fragment>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
const mapStateToProps = (store) => {
  //console.log(store)
  return {
    roominfo: store.roominfo,
    tab: store.tab,
    townfilters: store.townfilters,
  };
};
export const WarMap = connect(mapStateToProps)(MapCore);

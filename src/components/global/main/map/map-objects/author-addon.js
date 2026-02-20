import React from "react";
const L = require("react-leaflet");
import U from "../../../useful_functions";
import { connect } from "react-redux";
const NativeL = require("leaflet");

class AuthorAddon_ extends React.Component {
  render() {
    if (this.props.obj) {
      const authors = this.props.obj.wip
        .map((item) => {
          if (item.request && item.request.length > 0) {
            return U.GetUsername(this.props.users.users, item.author);
          }
        })
        .filter((x) => x);
      if (authors.length) {
        var IconText = NativeL.divIcon({
          className: "author_icon_txtc",
          html:
            "<div class='author_icon_text_container'><span class='note_icon_text'><b>" +
            `<img src="/img/Dunne_Transport_Vehicle_Icon.png"/> ${authors.length}` +
            "</b></span></div>",
        });
        IconText.options.iconSize = [54, undefined];
        IconText.options.iconAnchor = [27, 52];
        return (
          <L.Marker
            position={[this.props.obj.position.y, this.props.obj.position.x]}
            icon={IconText}
            opacity={1}
            zIndexOffset={900}
          />
        );
      }
    }
    return null;
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.users,
  };
};

export const AuthorAddon = connect(mapStateToProps)(AuthorAddon_);

import React from "react";
const L = require("react-leaflet");
const NativeL = require("leaflet");

export class AuthorAddon extends React.Component {
  render() {
    if (this.props.obj) {
      const authors = this.props.obj.wip
        .map((item) =>
          item.request && item.request.length > 0 ? item.author : null,
        )
        .filter((x) => x);
      const text = authors.join("<br>");
      if (text) {
        const maxWidth = Math.max(...authors.map((a) => a.length));
        var IconText = NativeL.divIcon({
          className: "note_icon_txtc",
          html:
            "<div class='note_icon_text_container'><span class='note_icon_text'><b>" +
            text +
            "</b></span></div>",
        });
        IconText.options.iconSize = [maxWidth * 6.24 + 60, undefined];
        IconText.options.iconAnchor = [
          maxWidth * 3.12 + 30,
          authors.length * 22 + 30,
        ];
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

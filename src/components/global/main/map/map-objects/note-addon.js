import React from 'react';
const L = require('react-leaflet');
const NativeL = require('leaflet');

export class NoteAddon extends React.Component {
  render() {
    if (this.props.obj) {
      let text = this.props.obj.notes;
      if (text != "") {
        text = JSON.parse(JSON.stringify(this.props.obj.notes));
        text = text.replace(/(?:\r\n|\r|\n)/g, '<br>');
      }
      if (text.length) {
        var IconText = NativeL.divIcon({className: 'note_icon_txtc', html:"<div className='note_icon_text_container'><span class='note_icon_text'><b>"+text+"</b></span></div>"});
        IconText.options.iconSize = [undefined, undefined];
        IconText.options.iconAnchor = [-14, 10];
        return <L.Marker position={[this.props.obj.position.y,this.props.obj.position.x]} icon={IconText} opacity={1} zIndexOffset={900}/>
      }
    }
    return null;
  }
}

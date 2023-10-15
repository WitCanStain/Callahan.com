import React from 'react';
import { connect } from 'react-redux';

const L = require('react-leaflet');

function BaseLayers_(props) {
  const { satmap } = props;

  return (
    <L.LayersControl position="topright">
      <L.LayersControl.BaseLayer name="Simple Map" checked={!satmap}>
        <L.TileLayer
          noWrap={true}
          continuousWorld={true}
          bounds={[[-256, 0], [0, 256]]}
          maxNativeZoom={5}
          url='../../../../../map_tiles/{z}/{z}_{x}_{y}.png'
        />
      </L.LayersControl.BaseLayer>

      <L.LayersControl.BaseLayer name="Advanced Map" checked={satmap}>
        <L.TileLayer
          noWrap={true}
          continuousWorld={true}
          bounds={[[-256, 0], [0, 256]]}
          maxNativeZoom={5}
          url='../../../../../map_tiles_adv/{z}/{z}_{x}_{y}.png'
        />
      </L.LayersControl.BaseLayer>
    </L.LayersControl>
  );
}

const mapStateToProps = store => {
  return {
    satmap: store.display.satmap
  };
};

export const BaseLayers = connect(mapStateToProps)(BaseLayers_);

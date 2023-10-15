import React from 'react';
//Props: PanRegion(index) - moves the camera to the selected region
export class RegionPan extends React.Component {
 render(){
  return (  <div className="dropdown pan-card" >
  <div id="filter_panheader" className="cardheader" data-toggle="dropdown" /*data-target="#filter_panbody"*/><img className="leaflet_pan_icon" src="https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdad-9.png"/></div>
      
    <div className="dropdown-menu dropdown-menu-right" id="filter_panbody">
<div className="btn-group btn-group-sm region_pan_btn_group">

<div className="btn-group-vertical region_pan_btn_group_vertical">
	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(16)}>Oarbreaker <br />Isles</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(15)}>Fisherman's <br />Row</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(48)}>Stema<br />Landing</button>
</div> 

<div className="btn-group-vertical region_pan_btn_group_vertical">
	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(29)}>Nevish <br />Line</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(13)}>Farranac <br />Coast</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(14)}>Westgate</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(42)}>Origin</button>
</div> 

<div className="btn-group-vertical region_pan_btn_group_vertical">
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(32)}>Callum's <br />Cape</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(12)}>Stonecradle</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(44)}>King's <br />Cage</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(43)}>Sableport</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(41)}>Ash <br />Fields</button>
</div> 
    
<div className="btn-group-vertical region_pan_btn_group_vertical">
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(33)}>Speaking <br />Woods</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(7)}>Moors</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(10)}>Linn <br />of <br />Mercy</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(9)}>Loch <br />Mor</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(8)}>Heartlands</button>
  	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(31)}>Red <br />River</button>
</div> 
      
<div className="btn-group-vertical region_pan_btn_group_vertical">
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(34)}>Basin <br />Sionnach</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(11)}>Reaching <br />Trail</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(4)}>Callahan's<br />Passage</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(3)}>Deadlands</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(6)}>Umbral <br />Wildwood</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(17)}>Great <br />March</button>
  	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(40)}>Kalokai</button>
</div> 
      
<div className="btn-group-vertical region_pan_btn_group_vertical">
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(35)}>Howl <br />County</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(25)}>Viper <br />Pit</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(5)}>Marban Hollow</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(23)}>Drowned <br />Vale</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(24)}>Shackled <br />Chasm</button>
  	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(30)}>Acritha</button>
</div> 
    
<div className="btn-group-vertical region_pan_btn_group_vertical">
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(36)}>Clanshead <br />Valley</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(22)}>Weathered <br />Expanse</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(46)}>The <br />Clahstra</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(21)}>Allod's <br />Bight</button>
	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(39)}>Terminus</button>
</div> 

<div className="btn-group-vertical region_pan_btn_group_vertical">
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(37)}>Morgen's <br />Crossing</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(45)}>Stlican <br />Shelf</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(20)}>Endless <br />Shore</button>
	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(47)}>Reaver's <br />Pass</button>
</div>

<div className="btn-group-vertical region_pan_btn_group_vertical">
	<button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(19)}>Godcrofts</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(18)}>Tempest <br />Island</button>
    <button type="button" className="btn regionbtn" onClick={()=>this.props.PanRegion(38)}>The <br />Fingers</button>
</div> 
  
  </div>
    </div>
    </div>);
 } 
}

import React from 'react';
import RegionImages from "../../_static/region-images";
///////////////////////////////////////////////////////////////////////
function GetMyRank(users) {
  //console.log(users)
  for (var i = 0; i < users.length; i++) {
    if (window.steamid == users[i].id) {
      return users[i].rank;
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compare(a, b) {
  if (a.rank < b.rank) return -1;
  if (a.rank > b.rank) return 1;
  return 0;
}
///////////////////////////////////////////////////////////////////////
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
////////////////////////////////////////////////////////////////
function GetUsername(users, id) {
  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      return users[i].name;
    }
  }
  return "Anonymous";
}
function ConvertTeam(obj) {
  switch (obj.teamId) {
    case "COLONIALS":
      return "colonial";
      break;
    case "WARDENS":
      return "warden";
      break;
    case "NONE":
      return "neutral";
      break;
    default:
  }
}
///////////////////////////////////////////////////////////////////////
function GetAvatar(users, id) {
  if (id.includes("anonymous")) {
    return "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
  }
  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      return users[i].avatar;
    }
  }
  return "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
}
//////////////////////////////////////////////////////////////////////
function GetUser(users, id) {
  //console.log("Checking user",users,id)
  for (var i = 0; i < users.length; i++) {
    if (id == users[i].id) {
      let user = JSON.parse(JSON.stringify(users[i]));
      user.valid = true;
      if (user.id.includes("anonymous")) {
        user.avatar =
          "https://cdn.glitch.com/dd3f06b2-b7d4-4ccc-8675-05897efc4bb5%2Fdasd.jpg?1556805827222";
      }
      return user;
    }
  }
  return { valid: false, role: 0 };
}
///////////////////////////////////////////////////////////////////////
function signature(obj) {
  if (obj.regionId == undefined) {
    return obj.x + obj.y;
  } else {
    return obj.x + obj.y + obj.regionId;
  }
}
///////////////////////////////////////////////////////////////////////
function GetUpdate(props) {
  let obj = props.obj;
  //console.log("Update obj",obj)
  return (
    <div
      className="card-header cardheader"
      data-toggle="collapse"
      href="#cardnotes"
    >
      Last Update: {GetDateString(new Date(obj.lastupdate))}
    </div>
  );

  function GetDateString(date) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var day = addZero(date.getDate());
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    if (year < 1100) {
      return "None";
    }
    var hour = addZero(date.getHours());
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());
    var string =
      day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
    return string;
  }

  function addZero(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  }
}
///////////////////////////////////////////////////////////////////////
function SplitTime(time) {
  var diffDays = Math.floor(time / 86400000);
  if (diffDays < 10) {
    diffDays = "0" + diffDays;
  }
  var diffHrs = Math.floor((time % 86400000) / 3600000); // hours
  if (diffHrs < 10) {
    diffHrs = "0" + diffHrs;
  }
  var diffMins = Math.floor(((time % 86400000) % 3600000) / 60000);
  if (diffMins < 10) {
    diffMins = "0" + diffMins;
  }
  var diffSec = Math.floor((((time % 86400000) % 3600000) % 60000) / 1000);
  if (diffSec < 10) {
    diffSec = "0" + diffSec;
  }
  var timestring = diffDays + ":" + diffHrs + ":" + diffMins + ":" + diffSec;
  return timestring;
}
////////////////////////////////////////////////////////////////////
function GetTownName(regionid, town, staticdata) {
  let labellist = [];
  const found = staticdata.find((element) => element.regionId === regionid)
  if (found) labellist = found.data.mapTextItems

  function compare(a, b) {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  }
  try {
    for (var i = 0; i < labellist.length; i++) {
      var xdif = Math.abs(town.x - labellist[i].x);
      var ydif = Math.abs(town.y - labellist[i].y);
      var distance = Math.sqrt(Math.pow(xdif, 2) + Math.pow(ydif, 2));
      labellist[i].distance = distance;
    }
    labellist.sort(compare);
  } catch (err) {
    console.log(err, staticdata, regionid);
  }
  try {
    return labellist[0].text;
  } catch (err) {
    return "undefined";
  }
}
////////////////////////////////////////////////
function convert(regionid, x, y) {
  return RegionImages.convert(regionid, x, y);
}
////////////////////////////////////////////////////
const GetStoreProps = store => {
  let privateinfo = store.private;
  let selected = store.selected;
  if (selected.type == "" || selected.key == "") {
    return {
      storeObj: {},
      selected: selected
    };
  }
  let obj = {};
  if (selected.townname == "misc") {
    obj = privateinfo.misc[selected.type][selected.key];
  } else {
    obj = privateinfo[selected.type][selected.key];
  }
  if (obj == undefined) {
    obj = {};
  } else {
    if (selected.townname == "misc") {
      obj = JSON.parse(
        JSON.stringify(privateinfo.misc[selected.type][selected.key])
      );
    } else {
      obj = JSON.parse(
        JSON.stringify(privateinfo[selected.type][selected.key])
      );
    }
  }
  return {
    storeObj: obj,
    selected: selected,
    refinery: privateinfo.refinery[selected.refinery],
    production: privateinfo.production[selected.production],
    storage: privateinfo.storage[selected.storage]
  };
};
//////////////////////////////////
const squadnumbers = [
  "https://hq.mreboy.com/img/glitch/1s.png",
  "https://hq.mreboy.com/img/glitch/s2.png",
  "https://hq.mreboy.com/img/glitch/s3.png",
  "https://hq.mreboy.com/img/glitch/s4.png",
  "https://hq.mreboy.com/img/glitch/s5.png"
];
////////////////////////////////////////////////////////////////////////////
const roleicons = [
  {
    name: "No role",
    url:
      "https://hq.mreboy.com/img/glitch/trasp.png"
  },

  {
    name: "  Medic",
    url:
      "https://hq.mreboy.com/img/IconFilterMedical.png"
  },
  {
    name: "  Engineer",
    url:
      "https://hq.mreboy.com/img/glitch/IconFilterUtility.png"
  },
  {
    name: "  Scrapper",
    url:
      "https://hq.mreboy.com/img/SledgeHammerItemIcon.png"
  },
  {
    name: "  Rifleman",
    url:
      "https://hq.mreboy.com/img/RifleItemIcon.png"
  },
  {
    name: "  Sniper",
    url:
      "https://hq.mreboy.com/img/SniperRifleItemIcon.png"
  },
  {
    name: "  Machine Gunner",
    url:
      "https://hq.mreboy.com/img/HeavyMachineGunIcon.png"
  },
  {
    name: "  Grenadier",
    url:
      "https://hq.mreboy.com/img/GrenadeItemIcon.png"
  },
  {
    name: "  RPG",
    url:
      "https://hq.mreboy.com/img/RpgItemIcon.png"
  },
  {
    name: "  Artillery Crew",
    url:
      "https://hq.mreboy.com/img/ArtilleryIcon.png"
  },
  {
    name: "  Sailor",
    url:
      "https://hq.mreboy.com/img/Shipyard.png"
  },
  {
    name: "  Vehicle Crew",
    url:
      "https://hq.mreboy.com/img/PistolWItemIcon.png"
  }
];
/////////////////////////////////////////////////////////////////////////////
function GetShortDate(date) {
  let datestring = new Date(date).toDateString();
  datestring = datestring.split(" ");
  let timestring = new Date(date).toLocaleTimeString();
  timestring = timestring.split(":");
  return (
    datestring[1] +
    " " +
    datestring[2] +
    " " +
    datestring[3] +
    " " +
    timestring[0] +
    ":" +
    timestring[1]
  );
}
//////////////////////////////
function FormatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
/////////////////////////////
export default {
  GetUpdate: GetUpdate,
  GetMyRank: GetMyRank,
  compare: compare,
  GetUsername: GetUsername,
  GetAvatar: GetAvatar,
  GetUser: GetUser,
  signature: signature,
  SplitTime: SplitTime,
  GetStoreProps: GetStoreProps,
  squadnumbers: squadnumbers,
  roleicons: roleicons,
  GetTownName: GetTownName,
  convert: convert,
  ConvertTeam: ConvertTeam,
  copy: copy,
  GetShortDate: GetShortDate,
  FormatNumber: FormatNumber
};

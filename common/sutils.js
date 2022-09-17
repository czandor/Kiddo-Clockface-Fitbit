import * as C from "../settings/const";
import * as util from "./utils";


export function settingsToSelect(settingsStorage){
  let s=null;
  let LOG=C.COMPANION_LOG;
  if(LOG) console.log("sutils  ---- starting settings convert "+ settingsStorage.getItem('settings'));
  //if(settingsStorage.getItem('settings')) s=JSON.parse(settingsStorage.getItem('settings'));
  //if(s) {for(let a = 0 ; a < C.SettingsDefaults.length ; a++) if(typeof s[a] === 'undefined') s[a]=C.SettingsDefaults[a];}
  //else s=C.SettingsDefaults;
  
  s=getSettingsArray(settingsStorage);
  //console.log(s[C.SettingsBgOption]);
  
  //settingsStorage.setItem("bgOption", createSelectValue(C.bgOptions,[s[C.SettingsBgOption]]));
  
  settingsStorage.setItem("SettingsBGColor", createSelectValue(colorOptions(settingsStorage,C.SettingsBGColor),[s[C.SettingsBGColor]]));
  settingsStorage.setItem("SettingsWeekColor", createSelectValue(colorOptions(settingsStorage,C.SettingsWeekColor),[s[C.SettingsWeekColor]]));
  settingsStorage.setItem("SettingsAmPmColor", createSelectValue(colorOptions(settingsStorage,C.SettingsAmPmColor),[s[C.SettingsAmPmColor]]));
  settingsStorage.setItem("SettingsHourColor", createSelectValue(colorOptions(settingsStorage,C.SettingsHourColor),[s[C.SettingsHourColor]]));
  settingsStorage.setItem("SettingsDDotColor", createSelectValue(colorOptions(settingsStorage,C.SettingsDDotColor),[s[C.SettingsDDotColor]]));
  settingsStorage.setItem("SettingsMinuteColor", createSelectValue(colorOptions(settingsStorage,C.SettingsMinuteColor),[s[C.SettingsMinuteColor]]));
  settingsStorage.setItem("SettingsMonthColor", createSelectValue(colorOptions(settingsStorage,C.SettingsMonthColor),[s[C.SettingsMonthColor]]));
  settingsStorage.setItem("SettingsDayColor", createSelectValue(colorOptions(settingsStorage,C.SettingsDayColor),[s[C.SettingsDayColor]]));
  settingsStorage.setItem("SettingsTableColor", createSelectValue(colorOptions(settingsStorage,C.SettingsTableColor),[s[C.SettingsTableColor]]));
  settingsStorage.setItem("SettingsNailColor", createSelectValue(colorOptions(settingsStorage,C.SettingsNailColor),[s[C.SettingsNailColor]]));
  settingsStorage.setItem("SettingsHRColor", createSelectValue(colorOptions(settingsStorage,C.SettingsHRColor),[s[C.SettingsHRColor]]));
  settingsStorage.setItem("SettingsStepsColor", createSelectValue(colorOptions(settingsStorage,C.SettingsStepsColor),[s[C.SettingsStepsColor]]));
  settingsStorage.setItem("SettingsAZMColor", createSelectValue(colorOptions(settingsStorage,C.SettingsAZMColor),[s[C.SettingsAZMColor]]));
  settingsStorage.setItem("SettingsDistanceColor", createSelectValue(colorOptions(settingsStorage,C.SettingsDistanceColor),[s[C.SettingsDistanceColor]]));
  settingsStorage.setItem("SettingsCaloriesColor", createSelectValue(colorOptions(settingsStorage,C.SettingsCaloriesColor),[s[C.SettingsCaloriesColor]]));
  settingsStorage.setItem("SettingsFloorsColor", createSelectValue(colorOptions(settingsStorage,C.SettingsFloorsColor),[s[C.SettingsFloorsColor]]));
  settingsStorage.setItem("SettingsBatteryColor", createSelectValue(colorOptions(settingsStorage,C.SettingsBatteryColor),[s[C.SettingsBatteryColor]]));
  settingsStorage.setItem("SettingsTimeColor", createSelectValue(colorOptions(settingsStorage,C.SettingsTimeColor),[s[C.SettingsTimeColor]]));
  settingsStorage.setItem("SettingsDateColor", createSelectValue(colorOptions(settingsStorage,C.SettingsDateColor),[s[C.SettingsDateColor]]));

  settingsStorage.setItem("units24h", createSelectValue(C.units24hOptions,[s[C.SettingsUnits24h]]));
  settingsStorage.setItem("unitsDistance", createSelectValue(C.unitsDistanceOptions,[s[C.SettingsUnitsDistance]]));

  settingsStorage.setItem("showAmPm", JSON.stringify(s[C.SettingsShowAmPm]==1));
  
  if(LOG) console.log("sutils  ---- settings converted to select tags");
}


let selectToSettingsTimer=null;
export function selectToSettings(settingsStorage,delay){
  if(!delay){
    if(selectToSettingsTimer) clearTimeout(selectToSettingsTimer);
    selectToSettingsTimer=setTimeout(function(){selectToSettings(settingsStorage,1)},1000);
    return;
  }
  selectToSettingsTimer=null;
  let s=getSettingsArray(settingsStorage);//JSON.parse(JSON.stringify(C.SettingsDefaults));
  let json=null;
  let LOG=C.SETTINGS_LOG;
  if(LOG) console.log("sutils  ---- starting convert select to settings");
  
  if(settingsStorage.getItem("SettingsBGColor") && (json=JSON.parse(settingsStorage.getItem("SettingsBGColor"))) ) s[C.SettingsBGColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsWeekColor") && (json=JSON.parse(settingsStorage.getItem("SettingsWeekColor"))) ) s[C.SettingsWeekColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsAmPmColor") && (json=JSON.parse(settingsStorage.getItem("SettingsAmPmColor"))) ) s[C.SettingsAmPmColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsHourColor") && (json=JSON.parse(settingsStorage.getItem("SettingsHourColor"))) ) s[C.SettingsHourColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsDDotColor") && (json=JSON.parse(settingsStorage.getItem("SettingsDDotColor"))) ) s[C.SettingsDDotColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsMinuteColor") && (json=JSON.parse(settingsStorage.getItem("SettingsMinuteColor"))) ) s[C.SettingsMinuteColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsMonthColor") && (json=JSON.parse(settingsStorage.getItem("SettingsMonthColor"))) ) s[C.SettingsMonthColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsDayColor") && (json=JSON.parse(settingsStorage.getItem("SettingsDayColor"))) ) s[C.SettingsDayColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsTableColor") && (json=JSON.parse(settingsStorage.getItem("SettingsTableColor"))) ) s[C.SettingsTableColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsNailColor") && (json=JSON.parse(settingsStorage.getItem("SettingsNailColor"))) ) s[C.SettingsNailColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsHRColor") && (json=JSON.parse(settingsStorage.getItem("SettingsHRColor"))) ) s[C.SettingsHRColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsStepsColor") && (json=JSON.parse(settingsStorage.getItem("SettingsStepsColor"))) ) s[C.SettingsStepsColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsAZMColor") && (json=JSON.parse(settingsStorage.getItem("SettingsAZMColor"))) ) s[C.SettingsAZMColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsDistanceColor") && (json=JSON.parse(settingsStorage.getItem("SettingsDistanceColor"))) ) s[C.SettingsDistanceColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsCaloriesColor") && (json=JSON.parse(settingsStorage.getItem("SettingsCaloriesColor"))) ) s[C.SettingsCaloriesColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsFloorsColor") && (json=JSON.parse(settingsStorage.getItem("SettingsFloorsColor"))) ) s[C.SettingsFloorsColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsBatteryColor") && (json=JSON.parse(settingsStorage.getItem("SettingsBatteryColor"))) ) s[C.SettingsBatteryColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsTimeColor") && (json=JSON.parse(settingsStorage.getItem("SettingsTimeColor"))) ) s[C.SettingsTimeColor]=json.values[0].value.id*1;
  if(settingsStorage.getItem("SettingsDateColor") && (json=JSON.parse(settingsStorage.getItem("SettingsDateColor"))) ) s[C.SettingsDateColor]=json.values[0].value.id*1;
  
  
  
  if(settingsStorage.getItem("units24h") && (json=JSON.parse(settingsStorage.getItem("units24h"))) ) s[C.SettingsUnits24h]=json.values[0].value.id*1;
  if(settingsStorage.getItem("unitsDistance") && (json=JSON.parse(settingsStorage.getItem("unitsDistance"))) ) s[C.SettingsUnitsDistance]=json.values[0].value.id*1;

  if(settingsStorage.getItem("showAmPm")) s[C.SettingsShowAmPm]=(settingsStorage.getItem("showAmPm")=='true')?1:0;
  
  if(LOG) console.log("sutils  ---- settings Select tags converted to settings settings: "+JSON.stringify(s));
  settingsStorage.setItem('settings',JSON.stringify(s));
}


export function cleanSettings(json){
  if(!json) json=JSON.parse(JSON.stringify(C.SettingsDefaults));
  for(let i=0 ; i < C.SettingsDefaults.length ; i++){
    if(!(i in json)) json[i]=C.SettingsDefaults[i];
  }
  return json;
}
export function getSettingsArray(settingsStorage){
  let json=null;
  if(settingsStorage.getItem('settings')) json=JSON.parse(settingsStorage.getItem('settings'));
  return cleanSettings(json);
} 

function createSelectValue(where,values){
  let json={"selected":[],"values":[]};
  //console.log(where,values);
  for(let i=0 ; i < values.length ; i++){
    let id=searchIdInList(where,values[i]);
    //console.log(id);
    json.selected[i]=id;
    json.values[i]=where[id];
  }
  return JSON.stringify(json);
}
function searchIdInList(where,value){
  //console.log(where,value);
  for(let a = 0 ; a < where.length ; a++){
    if((""+where[a].value.id) == (""+value)) return a;
  }
  return 0;
}

/*
export function colorOptions(){
  let colors=[];
  for(let i=0 ; i < C.BGColors.length ; i++){
    colors[i]={color: '#'+C.BGColors[i]};
  }
  return colors;
}
*/
export function colorOptions(settingsStorage,settingsColorId){
  let colors=[];
  let smallestPieces=(settingsColorId==C.SettingsTimeColor);
  let smallestWords=(settingsColorId==C.SettingsDateColor);
  let smallestChars=(settingsColorId==C.SettingsWeekColor || settingsColorId==C.SettingsAmPmColor || settingsColorId==C.SettingsHourColor || settingsColorId==C.SettingsMinuteColor || settingsColorId==C.SettingsMonthColor || settingsColorId==C.SettingsDayColor || settingsColorId==C.SettingsHRColor || settingsColorId==C.SettingsStepsColor || settingsColorId==C.SettingsAZMColor || settingsColorId==C.SettingsDistanceColor || settingsColorId==C.SettingsCaloriesColor || settingsColorId==C.SettingsFloorsColor || settingsColorId==C.SettingsBatteryColor);
  
  if(smallestPieces) colors.push({name:'By pieces',value:{id:''+C.COLOR_RANDOM_CHAR,info:'Different for pieces',icon:'https://czandor.hu/fitbit/amongus/randomcolors.png'}});
  if(smallestWords) colors.push({name:'By words',value:{id:''+C.COLOR_RANDOM_CHAR,info:'Different for words',icon:'https://czandor.hu/fitbit/amongus/randomcolors.png'}});
  if(smallestChars) colors.push({name:'Random by chars',value:{id:''+C.COLOR_RANDOM_CHAR,info:'Random for every char',icon:'https://czandor.hu/fitbit/amongus/randomcolors.png'}});
  colors.push({name:'Random',value:{id:''+C.COLOR_RANDOM,info:'Random color',icon:'https://czandor.hu/fitbit/amongus/random.png'}});
  let id=0;
  for( let b=0 ; b < 16 ; b++) for(let a=0 ; a < 4 ; a++){
    let i=(a*16)+b;
    let name=C.colors[i].getName();
    colors.push({name:name,value:{id:''+i,info:name,icon:'https://czandor.hu/fitbit/colors.php?id='+id}});
    id++;
  }
  return colors;
}



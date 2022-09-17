import * as fs from "fs";
import {APP_LOG as LOG} from "../common/const";
import * as C from "../common/const";
import * as util from '../common/utils';

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "coloringv2.cbor";


//to save
let holder = null;

//temporary variables
let loaded=false;
let saved=false;

export function getSettings(id){
  if(!loaded) load();
  if(typeof id !== 'undefined') return holder.settings[id];
  return holder.settings;
}
export function setSettings(s){
  //if(holder.settings[C.SettingsBgColorId] != s[C.SettingsBgColorId]) holder.bgColor=s[C.SettingsBgColorId];
  holder.settings=s;
  saved=false;
}

export function load() {
  if(LOG) console.log("Loading settings");
  let loadedFromFile=true;
  let h=null;
  try {
    h=fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    if(LOG) console.log("no settings file, defaults loaded");
    h= {}
    loadedFromFile=false;
  }
  //if(!('lastPingSuccess' in s) ) s.lastPingSuccess=0;
  if(!('settings' in h) ) h.settings=C.SettingsDefaults;
  for(let a = 0 ; a < C.SettingsDefaults.length ; a++) if(typeof h.settings[a] === 'undefined') h.settings[a]=C.SettingsDefaults[a];
  //if(!('AOD' in h) ) h.AOD=0;
  
  holder=h;
  loaded=true;
  return loadedFromFile;
}

export function save(){
  if(LOG) console.log("Saving settings");
  try {
    fs.unlinkSync(SETTINGS_FILE);
  } catch (ex) {
  }
  fs.writeFileSync(SETTINGS_FILE, holder, SETTINGS_TYPE);
  if(LOG) console.log("settings file saved");
  saved=true;
}
export function clear(){
  if(LOG) console.log("Clearing settings");
  fs.unlinkSync(SETTINGS_FILE);
  load();
}

export function showAmPm(){
  return getSettings(C.SettingsShowAmPm)==1;
}
export function is12h(preferences){
  let h24=getSettings(C.SettingsUnits24h);
  if(h24==C.UnitsDefault) return (preferences.clockDisplay === "12h");
  return (h24==C.UnitsUS);
}
export function isMetric(units){
  let metric=getSettings(C.SettingsUnitsDistance);
  if(metric==C.UnitsDefault) return (units.distance=="metric");
  return (metric==C.UnitsMetric);
}
let prevColor=-1;
let prevColorId=-1;
let bgColor=-1;
let tableColor=-1;
export function setPrevColor(color){
  prevColorId=-1;
  prevColor=color;
  return prevColor;
}
export function getColor(settingsColorId){
  let colorCode=getSettings(settingsColorId);
  let color=-1;
  let forBg=(settingsColorId==C.SettingsBGColor);
  let forTable=(settingsColorId==C.SettingsTableColor);
  let onTable=(settingsColorId==C.SettingsNailColor || settingsColorId==C.SettingsHRColor || settingsColorId==C.SettingsStepsColor || settingsColorId==C.SettingsAZMColor || settingsColorId==C.SettingsDistanceColor || settingsColorId==C.SettingsCaloriesColor || settingsColorId==C.SettingsFloorsColor);
  let onBg=!onTable;
  if(forBg || forTable) onBg=onTable=false;
  let vivid=(onBg||onTable);
  //if(settingsColorId == C.SettingsHRColor) console.log(settingsColorId,prevColorId,colorCode);
  if(prevColorId==settingsColorId && colorCode == C.COLOR_RANDOM) color=prevColor;
  else{
    if(colorCode == C.COLOR_RANDOM || colorCode == C.COLOR_RANDOM_CHAR) color=generateColor(forBg,forTable,onBg,onTable);
    else color=colorCode;
  }
  prevColorId=settingsColorId;
  prevColor=color;
  if(forBg) bgColor=color;
  if(forTable) tableColor=color;
  if(color in C.colors) return C.colors[color].getColor(vivid);
  return '#FFFFFF';
}
function generateColor(forBg,forTable,onBg,onTable){
  
  let c=C.colors.length-1;
  let ce=prevColor;
  if(forBg || onTable) ce=tableColor;
  if(forTable || onBg) ce=bgColor;
  for(let i= 0 ; i < 100 ; i++){
    c=util.getRandomInt(0,C.colors.length-1);
    //c=getRandomColor();
    if(C.colors[c].isEnabled() && c != prevColor && c != ce) {
      return c;
    }
    //console.log('alt: '+alt+',forBg: '+forBg+',forTable: '+forTable+',onBg: '+onBg+',onTable: '+onTable+',c: '+c+',prevColor: '+prevColor+',bgColor: '+bgColor+',tableColor: '+tableColor);
  }
  return c;
}



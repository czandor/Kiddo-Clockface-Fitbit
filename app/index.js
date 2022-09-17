import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as C from "../common/const";
import { units} from "user-settings";
import { user } from "user-profile";
import { today as todayActivity } from "user-activity";
import { primaryGoal } from "user-activity";
import { goals } from "user-activity";

import { me } from "appbit";
import { display } from "display";

import { vibration } from "haptics";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { battery } from "power";
import { charger } from "power";
import { me as device } from "device";
util.setDevice(device);


import { memory } from "system";

import * as settings from "./settings";
import * as messaging from "messaging";

if(!settings.load()){
  console.log("First start after install...");
  settings.save();
  //setTimeout(function(){
    
    //launchApp(C.UUID);
    //me.exit();
  //},10);
}


let bodyPresent=false;
let hrbpm=0;
let hrm=null;
let body=null;
let healthAlt=false;
let needColorize=true;

// Update the clock every minute
clock.granularity = "minutes";
battery.onchange=function(evt){drawBatt();};
charger.onchange=function(evt){drawBatt();};
if (me.permissions.granted("access_heart_rate")) {
  if (HeartRateSensor) {
    hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
      //if(LOG) console.log("Current heart rate: " + hrm.heartRate);
      if(hrbpm != hrm.heartRate){
        hrbpm = hrm.heartRate;
        drawHR();
      }
    });
    hrm.start();
  }
  if (BodyPresenceSensor) {
    body = new BodyPresenceSensor();
    body.addEventListener("reading", () => {
      bodyPresent=body.present;
      if (!body.present) {
        hrm.stop();
        hrbpm=0;
        drawHR();
      } else {
        hrm.start();
      }
      //drawHR();
    });
    body.start();
  }
  
  
  //if(LOG) console.log("Started heart rate: " + JSON.stringify(hrm));
}
else{
  //if(LOG) console.log("Heart rate not started, no permission");
}

document.getElementById('healthBlock').onclick=function(){
  vibration.start('bump');
  document.getElementById('tableHealth').animate("disable");
  setTimeout(function(){
    healthAlt=!healthAlt;
    //changeColors(true);
    drawHealth();
    document.getElementById('tableHealth').animate("enable");
  },250);
  
}

display.onchange = function() {
  //let today = new Date();
  if (!display.on) { //képernyő KIKAPCSOLVA 
    onDisplayOff();
  }
  else{ //képernyő BEKAPCSOLVA
    onDisplayOn();
   }
}

function onDisplayOn(){
  healthAlt=false;
  //document.getElementById('bg2').style.opacity=1;
  //document.getElementById('delay').animate("enable");
  if(hrm) hrm.start();
  if(body) body.start();
}
function onDisplayOff(){
  healthAlt=false;
  drawHealth();
  changeBgColors();
  //document.getElementById('bg2').animate('enable');
  //document.getElementById('delay').animate("disable");
  
  if(hrm) hrm.stop();
  if(body) body.stop();
}
function changeBgColors(){
  document.getElementById('type-'+C.SettingsBGColor).style.fill=settings.getColor(C.SettingsBGColor);
  document.getElementById('type-'+C.SettingsTableColor).style.fill=settings.getColor(C.SettingsTableColor);
  for (let i=1; i<=4 ; i++) document.getElementById('type-'+C.SettingsNailColor+'-'+i).style.fill=settings.getColor(C.SettingsNailColor);
  //changeColors();
  //document.getElementById('bg2').style.fill=generateColor(true);
  
}
changeBgColors();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  tick();
}
let timeW=200;
let ampmText="";
let timePos=150;
function tick(){
  let today = new Date();
  let hours = today.getHours();
  ampmText="";
  if (settings.is12h(preferences)) {
    // 12h format
    if(settings.showAmPm()) ampmText=(hours < 12)?"AM":"PM";
    hours = hours % 12 || 12;
  } else {
    // 24h format
    //hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  
  //document.getElementById('bg2').animate('disable');
  timePos=device.screen.width/2+((device.ionic)?33:0);
  timeW=printText(`${hours}:${mins}`,1,timePos,C.SettingsTimeColor);
  
 
  drawDelayed();

}
function drawDelayed(delayed){
  if(!delayed) {
    setTimeout(function(){drawDelayed(true)},50);
    return;
  }

  
  let today = new Date();
  
  let weekAlign=((ampmText=='')?1:0);
  let weekPos=device.screen.width/2;
  let ampmPos=0;
  if(device.sense && weekAlign==0){
    weekPos=60;
    ampmPos=device.screen.width-weekPos;
  }
  if(device.versa && weekAlign==0){
    weekPos=45;
    ampmPos=device.screen.width-weekPos;
  }
  //console.log(weekPos,ampmPos);
  if(device.ionic){
    weekAlign=2;
    weekPos=ampmPos=(timePos-(timeW/2))-9;
  }
  printText(C.WEEKDAYS_DEFAULT[today.getDay()],weekAlign,weekPos,C.SettingsWeekColor);
  printText(ampmText,2,ampmPos,C.SettingsAmPmColor);

  printText(`${C.MONTHNAMES_LONG_DEFAULT[today.getMonth()]} ${((today.getDate()))}`,1,device.screen.width/2,C.SettingsDateColor);

  drawBatt();
  drawHealth();
}
function drawHealth(){
  
  let steps=(todayActivity.adjusted.steps || todayActivity.local.steps || 0);
  let distance=(todayActivity.adjusted.distance || todayActivity.local.distance || 0);
  let minutes=((todayActivity.adjusted.activeZoneMinutes || todayActivity.local.activeZoneMinutes || {total:0}).total);//(todayActivity.adjusted.activeMinutes || todayActivity.local.activeMinutes || 0);
  let calories=(todayActivity.adjusted.calories || todayActivity.local.calories || 0);
  let elevation=(todayActivity.adjusted.elevationGain || todayActivity.local.elevationGain || 0); 
  
  if(healthAlt){
    let distIsMetric=settings.isMetric(units);
    let distNum=distance*((distIsMetric)?0.001:0.000621371192);
    let distText=distNum.toFixed((distNum<10)?2:1); //+((distIsMetric)?"km":"mi");
    document.getElementById('icon-health1').style.fill=C.colors[settings.setPrevColor(39)].getColor(true);//prevColor="#AA55FF";
    document.getElementById('icon-health1').href="images/health/distance.png";
    document.getElementById('icon-health1b').href="images/health/distanceb.png";
    printText(distText,1,60,C.SettingsDistanceColor);

    document.getElementById('icon-health2').style.fill=C.colors[settings.setPrevColor(52)].getColor(true);//prevColor="#FF5500";
    document.getElementById('icon-health2').href="images/health/calories.png";
    document.getElementById('icon-health2b').href="images/health/caloriesb.png";
    printText(calories,1,150-((device.versa)?10:0),C.SettingsCaloriesColor);

    if(device.noBarometer){
      document.getElementById('icon-health3').href='';
      document.getElementById('icon-health3b').href='';
      elevation='';
    }
    else{
      document.getElementById('icon-health3').style.fill=C.colors[settings.setPrevColor(60)].getColor(true);//prevColor="#FFFF00";
      document.getElementById('icon-health3').href="images/health/elevationGain.png";
      document.getElementById('icon-health3b').href="images/health/elevationGainb.png";
    }
    printText(elevation,1,300-((device.versa)?20:0)-60,C.SettingsFloorsColor);
  }
  else{
    drawHR();

    document.getElementById('icon-health2').style.fill=C.colors[settings.setPrevColor(11)].getColor(true);//"#55FFFF";
    document.getElementById('icon-health2').href="images/health/steps.png";
    document.getElementById('icon-health2b').href="images/health/stepsb.png";
    printText(steps,1,150-((device.versa)?10:0),C.SettingsStepsColor);

    document.getElementById('icon-health3').style.fill=C.colors[settings.setPrevColor(29)].getColor(true);//"#55FF55";
    document.getElementById('icon-health3').href="images/health/activeZoneMinutes.png";
    document.getElementById('icon-health3b').href="images/health/activeZoneMinutesb.png";
    printText(minutes,1,300-((device.versa)?20:0)-60,C.SettingsAZMColor);
  }
  

  
}
function drawBatt(){
  let batteryLevel=Math.floor(battery.chargeLevel);
  let charging=(battery.charging || charger.connected);
  //let colors=["ff3300","ff6600","fe9900","ffcc00","ffff00","ccff00","99fe00","65ff00","33ff00","00ff01","55AAAA"];
  let colors=[32,48,52,56,60,44,29,28,12,8,23];
  let battColor=(charging)?colors[10]:colors[Math.min(Math.floor(batteryLevel/10),9)];
  document.getElementById('batt').style.fill=C.colors[settings.setPrevColor(battColor)].getColor(true);//prevColor="#"+battColor;
  printText(batteryLevel,0,device.screen.width/2+2,C.SettingsBatteryColor);
  
}

function drawHR(){
  //x=util.getRandomInt(20,60);
  if(healthAlt) return;
  let hrZone="";
  if(bodyPresent && hrbpm>0) hrZone=user.heartRateZone(hrbpm);
  let hrColor=48;//"#FF0000";
  switch(hrZone){
    case "peak":
      hrColor=56;//"#FF00FF";
      break;
    case "cardio":
    case "above-custom":
      hrColor=53;//50;//"#FF00AA";
      break;
    case "fat-burn":
    case "custom":
      hrColor=51;//49;//"#FF0055";
      break;
    case "":
      hrColor=42;//"#AAAAAA";
      break;
    case "out-of-range":
    case "below-custom":
    default:
      
      break;
  }
  //console.log(hrColor);
  document.getElementById('icon-health1').style.fill=C.colors[settings.setPrevColor(hrColor)].getColor(true);//prevColor=hrColor;
  document.getElementById('icon-health1').href="images/health/hr.png";
  document.getElementById('icon-health1b').href="images/health/hrb.png";
  printText((bodyPresent && hrbpm>0)?hrbpm:'...',1,60,C.SettingsHRColor);
}
/*
function changeColors(justHealth){
  if(!justHealth) justHealth=false;
  for(let colorId=0 ; colorId <= C.SettingsDateColor ;  colorId++){
    let health1=(colorId==C.SettingsHRColor || colorId==C.SettingsStepsColor || colorId==C.SettingsAZMColor);
    let health2=(colorId==C.SettingsDistanceColor || colorId==C.SettingsCaloriesColor || colorId==C.SettingsFloorsColor);
    if(justHealth && !((health1 || health2))) continue;
    if(healthAlt && health1) continue;
    if(!healthAlt && health2) continue;
    let type=getTypeId(colorId);
    for(let i = 1 ; i <= 12 ; i++) if(document.getElementById(type+i)) {
      document.getElementById(type+i).style.fill=settings.getColor(colorId);
    }
  }
}*/
function getTypeId(settingsColorId){
  let type="type-"+settingsColorId+"-";
  if(settingsColorId==C.SettingsHRColor || settingsColorId==C.SettingsDistanceColor) type="text-health1-";
  if(settingsColorId==C.SettingsStepsColor || settingsColorId==C.SettingsCaloriesColor) type="text-health2-";
  if(settingsColorId==C.SettingsAZMColor || settingsColorId==C.SettingsFloorsColor) type="text-health3-";
  return type;
}
function printText(text,align,x,settingsColorId){
  let size="small";
  let type=getTypeId(settingsColorId);
  if(settingsColorId==C.SettingsTimeColor) {
    size="big";
  }
  text=text.toString().toLowerCase();
  for(let i = 1 ; i <= 12 ; i++) if(document.getElementById(type+''+i)) {
    document.getElementById(type+''+i).style.display='none';
    document.getElementById(type+''+i+'b').style.display='none';
  }
  let width=C.SIZES[size]['spacer'][1]*-1;
  let sizes=[[0,0]];
  //sizes[text.length+1]=[0,0];
  for(let i = 1  ; i <= text.length ; i++){
    let c=text[i-1];
    let filename=c;
    //console.log(c);
    if(c==':') filename="ddot";
    if(c=='.') filename="dot";
    if(document.getElementById(type+''+i)) {
      if(c!=' '){
        document.getElementById(type+''+i).style.display='inline';
        document.getElementById(type+''+i).href='images/'+size+'/'+filename+'.png';
        document.getElementById(type+''+i+'b').style.display='inline';
        document.getElementById(type+''+i+'b').href='images/'+size+'/'+filename+'b.png';
      }
      sizes[i]=C.SIZES[size][filename];
      width+=C.SIZES[size][filename][1]+C.SIZES[size]['spacer'][1];
    }
  }
  if(align == 1) x-=(width/2);
  if(align == 2) x-=width;
  let actualCharWidth=0;
  let color='';
  if(settingsColorId == C.SettingsTimeColor && settings.getSettings(C.SettingsTimeColor) == C.COLOR_RANDOM_CHAR) settingsColorId=C.SettingsHourColor;
  if(settingsColorId == C.SettingsDateColor && settings.getSettings(C.SettingsDateColor) == C.COLOR_RANDOM_CHAR) settingsColorId=C.SettingsMonthColor;
  for(let i = 1  ; i <= text.length ; i++){
    let c=text[i-1];
    if(settingsColorId == C.SettingsHourColor && c==':') settingsColorId=C.SettingsDDotColor;
    if(settingsColorId == C.SettingsDDotColor && c!=':') settingsColorId=C.SettingsMinuteColor;
    if(settingsColorId == C.SettingsMonthColor && c==' ') settingsColorId=C.SettingsDayColor;
    if(document.getElementById(type+''+i)) {
      document.getElementById(type+''+i).x=x+actualCharWidth-sizes[i][0];
      document.getElementById(type+''+i+'b').x=x+actualCharWidth-sizes[i][0];
      if(c!=' ') document.getElementById(type+''+i).style.fill=settings.getColor(settingsColorId);
      actualCharWidth+=sizes[i][1]+C.SIZES[size]['spacer'][1];//-sizes[i+1][0];
    }
  }
  return width;
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  console.log("Got message from COMPANION: "+evt.data[0]+", "+JSON.stringify(evt.data[1]));
  let today=new Date();
  if(evt.data[1] !== null && evt.data[1][0] !== null) switch(evt.data[0]){
    /*case C.MessageTypePing:
        if(messaging.peerSocket.readyState === messaging.peerSocket.OPEN) messaging.peerSocket.send([C.MessageTypePong,evt.data[1][0]]);
        return;*/
    case C.MessageTypeSettings:
        settings.setSettings(evt.data[1]);
        break;
    /*case C.MessageTypeName:
      settings.setName(evt.data[1]);
      break;*/
  }
  if(display.on) {
    changeBgColors();
    tick();
  }
  display.poke();
  //tick("peerSocket.onmessage");
  settings.save();
}


me.onunload=function(evt){settings.save();};

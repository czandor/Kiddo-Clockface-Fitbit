import {COMPANION_LOG as LOG} from "../settings/const"

import * as C from "../settings/const"
import * as sutil from "../common/sutils";
import { me } from "companion";

import * as messaging from "messaging";
import { localStorage } from "local-storage";
import { settingsStorage } from "settings";

import { device } from "peer";
import { me as companion } from "companion";



function initStorage(clear){
  if(LOG) console.log('initStorage started...');
  if(!localStorage.getItem('storageInited',0)) clear=true;
  
  if(!clear) clear=false;
  else if(LOG) console.log('Clearing local and settings storages');
  if(clear) settingsStorage.clear();
  sutil.settingsToSelect(settingsStorage);
  
  if(clear) localStorage.clear();
  
  if(clear && LOG) console.log('Success clearing local and settings storages');
  
  localStorage.setItem('storageInited',1);
  
  setTimeout(function(){
    settingsStorage.setItem('isLCD',(device.modelName&&(device.modelName=='Ionic'||device.modelName=='Versa'||device.modelName=='Versa Lite'))?'true':'false');
    settingsStorage.setItem('isSense',(device.modelName&&(device.modelName=='Sense'||device.modelName=='Versa 3'))?'true':'false');
    settingsStorage.setItem('access_internet',(companion.permissions.granted("access_internet"))?'true':'false');
  },1000); 
}

if(LOG==2) initStorage(true);
else initStorage();

messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  if(LOG) console.log("Got message from device: "+JSON.stringify(evt.data));
  setTimeout(function(){gotMessage(evt);},100);
}
function gotMessage(evt){
  let today=new Date();

  if(!evt.data[0]) return;
  let type=evt.data[0];
  let data=evt.data[1];
  /*if(type == C.MessageTypePong && data) {
    settingsStorage.setItem('connectionInfo',JSON.stringify(evt.data[1]));
  }*/
  
  
}
settingsStorage.onchange = function(evt) {
  if(LOG) console.log("Got message from settings, key: "+evt.key+", processing...");
  //if(evt.key == 'settingsRunning'){
  //    settingsStorage.setItem('connectionInfo',JSON.stringify((messaging.peerSocket.readyState === messaging.peerSocket.OPEN)));
  //}
  //else 
    if(!processSettingsMessage(evt.key,evt.newValue,true)){
      settingsStorage.setItem(evt.key,evt.oldValue);
      initStorage();
      settingsStorage.setItem('connectionInfo','false');
    };
}

if (me.launchReasons.settingsChanged) {
  if(LOG) console.log("launchReasons.settingsChanged, sendAllSettings in 3 secs...");
  setTimeout(function(){sendAllSettings();},3000);
}
if (me.launchReasons.peerAppLaunched) {
  if(LOG) console.log("launchReasons.peerAppLaunched, sendAllSettings in 3 secs...");
  setTimeout(function(){sendAllSettings();},3000);
}
function sendAllSettings(){
  for (let i = 0; i < settingsStorage.length; i++){
    //setTimeout(function(){processSettingsMessage(settingsStorage.key(i),(settingsStorage.getItem(settingsStorage.key(i))));},i*50);
    if(processSettingsMessage(settingsStorage.key(i),(settingsStorage.getItem(settingsStorage.key(i))),false)) return;
  }
}
function processSettingsMessage(key,newValue,defaultReturnValue){
  if(LOG){
    // Which setting changed
    //console.log("message ---- Processing settings message, key: " + key+");
    //  What was the old value
    //console.log("old value: " + evt.oldValue)
    //  What is the new value
    console.log("message ---- new value: " + newValue);
  }
  let messageType=null;
  let message=null;
  let json=null;
  switch(key){
    case "settings":
      messageType=C.MessageTypeSettings;
      if(json=JSON.parse(newValue)) {
        message=JSON.stringify(json);
      }
      break;
    case "playerName":
      messageType=C.MessageTypeName;
      if(json=JSON.parse(newValue)) {
        message=JSON.stringify(json.name);
      }
      break;
    /*case "settingsRunning":
      messageType=C.MessageTypePing;
      if(json=JSON.parse(newValue)) {
        message=JSON.stringify([json]);
      }
      break;*/
  }
  
  if(messageType===null || message===null) {
    if(LOG) console.log("message ---- No message to send to watch, messageType: "+messageType+", message: "+message);
    return defaultReturnValue;
  }
  return sendMessage(messageType,message,0,defaultReturnValue);
}

function sendMessage(type,data,counter,defaultReturnValue){
  if(!counter) counter=0;
  if(localStorage.getItem('sentMessage-'+type) != data){
    if(LOG) console.log("message ---- Sending message to watch: type: "+type+", data: "+(data));
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      if(LOG) console.log("message ---- peerSocket is OK, sending...");
      localStorage.setItem('sentMessage-'+type,(data));
      messaging.peerSocket.send([type,JSON.parse(data)]);
      return true;
    }
    else{
      if(LOG) console.log("message ---- NOT sending message to watch messaging.peerSocket.readyState="+messaging.peerSocket.readyState); 
      /*if(counter < 2){
        if(LOG) console.log("Delaying message, count #"+counter); 
        counter++;
        setTimeout(function(){sendMessage(type,data,counter);},3000);
      }
      else{
        if(LOG) console.log("Message not sent, giving up..."); 
      }*/
      return false;
    }
  }
  else{
    if(LOG) console.log("message ---- Not sending message to watch, same message already sent"); 
  }
  return defaultReturnValue;
}


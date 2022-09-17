import {SETTINGS_LOG as LOG} from "./const"
import * as C from "./const";
import * as sutil from "../common/sutils";


let settingsStorage=null;
let started=false;
/*let pingCounter=4;
let interval=setInterval(function(){
  pingCounter++;
  if(connectionOK() && (pingCounter%5) != 0) return;
  let today = new Date();
  let seconds=Math.floor(today.getTime()/1000);
  settingsStorage.setItem('settingsRunning',JSON.stringify(seconds));
  if(LOG) console.log("Connection to watch: "+settingsStorage.getItem('connectionInfo'));
},1000);
*/

function getImageRow(name,value){
  return <TextImageRow
                  label={name}
                  sublabel={value.info}
                  icon={value.icon}
                />
}
function getImageRowById(name,options,id){
  name=name.toUpperCase();
  for(let i = 0 ; i < options.length ; i++) {
    if((options[i].value.id*1)==(id*1)) return <Text>{name}{getImageRow('',options[i].value)}</Text>
  }
  return <Text>Not found</Text>
}
function selectUpdate(runNow){
  if(!runNow){
    setTimeout(function(){ 
      selectUpdate(settingsStorage,true);
    }, 500);
    return;
  }
  sutil.selectToSettings(settingsStorage);
}


function isTimeColorPieces(){
  let s=sutil.getSettingsArray(settingsStorage);
  return (s[C.SettingsTimeColor] == C.COLOR_RANDOM_CHAR);
}
function isDateColorPieces(){
  let s=sutil.getSettingsArray(settingsStorage);
  return (s[C.SettingsDateColor] == C.COLOR_RANDOM_CHAR);
}

function connectionOK(){
  if(!settingsStorage.getItem('connectionInfo')) return true;
  return JSON.parse(settingsStorage.getItem('connectionInfo'));
  /*let today = new Date();
  let seconds=Math.floor(today.getTime()/1000);
  return JSON.parse(settingsStorage.getItem('connectionInfo') > (seconds - 10));*/
}

function mySettings(props) {
  settingsStorage=props.settingsStorage;
  if(!started){
    started=true;
    //let today = new Date();
    //let seconds=Math.floor(today.getTime()/1000);
    //settingsStorage.setItem('connectionInfo',JSON.stringify(seconds-8));
    settingsStorage.setItem('connectionInfo','true');
  }
  return (
    <Page>
      {!(JSON.parse(props.settingsStorage.getItem('access_internet') || 'false')) && <Text bold align="left">🌐 - Internet Permission is required to fully use these settings. You can enable it in the 'Permissions' settings of the clock face</Text>}
      
      { !connectionOK() && <Section
        title={<Text bold align="left">❌ - NO CONNECTION TO WATCH!</Text>}>
          <Text bold align="left">There is no connection between your watch and your phone.</Text>
          <Text align="center">You need a connection to use the settings.</Text>
          <Button
            label={<Text bold align="center">TRY AGAIN</Text>}
            onClick={() => props.settingsStorage.setItem('connectionInfo','true')}
          />
          <Text bold align="left">Possible solutions:</Text>
          <Text align="left">- Turn off and on the Bluetooth on your phone.</Text>
          {!(JSON.parse(props.settingsStorage.getItem('isSense') || 'false')) && <Text align="left">- Launch the 'Today' screen (swipe up) on your watch, and after 3 seconds return to time with the back button.</Text>}
          {(JSON.parse(props.settingsStorage.getItem('isSense') || 'false')) && <Text align="left">- Launch the 'Today' program (swipe left) on your watch, and after 3 seconds return to time with the back button.</Text>}
          <Text align="left">- Go back to the Fitbit home screen on your phone, make sure your watch syncs properly, and then come back here.</Text>
          <Text align="left">- Ultimately, restart your watch and / or your phone. You can turn off your watch by going to Settings-&gt;About-&gt;Shut down.</Text>
      </Section>}
      { true && <Section
        title={<Text align="left">🆓 - SUPPORT MY WORK.</Text>}>
        <Text align="left">This clockface is completely free. Please support my work if you can.</Text>
        <Link source="https://czandor.hu/paypal/colorfun">☕ Buy me a coffee</Link>      
      </Section> }
      { connectionOK() && <Section
        title={<Text bold align="left">🎨 - COLORS</Text>}>
        <Select
          label={getImageRowById("Background",sutil.colorOptions(settingsStorage,C.SettingsBGColor),sutil.getSettingsArray(settingsStorage)[C.SettingsBGColor])}
          selectViewTitle="Background color"
          settingsKey="SettingsBGColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsBGColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Days Name",sutil.colorOptions(settingsStorage,C.SettingsWeekColor),sutil.getSettingsArray(settingsStorage)[C.SettingsWeekColor])}
          selectViewTitle="Days of the Week color"
          settingsKey="SettingsWeekColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsWeekColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("AM/PM",sutil.colorOptions(settingsStorage,C.SettingsAmPmColor),sutil.getSettingsArray(settingsStorage)[C.SettingsAmPmColor])}
          selectViewTitle="AM/PM color"
          settingsKey="SettingsAmPmColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsAmPmColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Time",sutil.colorOptions(settingsStorage,C.SettingsTimeColor),sutil.getSettingsArray(settingsStorage)[C.SettingsTimeColor])}
          selectViewTitle="Times color"
          settingsKey="SettingsTimeColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsTimeColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        {isTimeColorPieces() && <Select
          label={getImageRowById("Time > Hours",sutil.colorOptions(settingsStorage,C.SettingsHourColor),sutil.getSettingsArray(settingsStorage)[C.SettingsHourColor])}
          selectViewTitle="Hours color"
          settingsKey="SettingsHourColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsHourColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />}
        {isTimeColorPieces() && <Select
          label={getImageRowById("Time > Colon",sutil.colorOptions(settingsStorage,C.SettingsDDotColor),sutil.getSettingsArray(settingsStorage)[C.SettingsDDotColor])}
          selectViewTitle="Colon color"
          settingsKey="SettingsDDotColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsDDotColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />}
        {isTimeColorPieces() && <Select
          label={getImageRowById("Time > Minutes",sutil.colorOptions(settingsStorage,C.SettingsMinuteColor),sutil.getSettingsArray(settingsStorage)[C.SettingsMinuteColor])}
          selectViewTitle="Minutes color"
          settingsKey="SettingsMinuteColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsMinuteColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />}
        <Select
          label={getImageRowById("Date",sutil.colorOptions(settingsStorage,C.SettingsDateColor),sutil.getSettingsArray(settingsStorage)[C.SettingsDateColor])}
          selectViewTitle="Date color"
          settingsKey="SettingsDateColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsDateColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        {isDateColorPieces() && <Select
          label={getImageRowById("Date > Month",sutil.colorOptions(settingsStorage,C.SettingsMonthColor),sutil.getSettingsArray(settingsStorage)[C.SettingsMonthColor])}
          selectViewTitle="Name of months color"
          settingsKey="SettingsMonthColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsMonthColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />}
        {isDateColorPieces() && <Select
          label={getImageRowById("Date > Day",sutil.colorOptions(settingsStorage,C.SettingsDayColor),sutil.getSettingsArray(settingsStorage)[C.SettingsDayColor])}
          selectViewTitle="Day-number color"
          settingsKey="SettingsDayColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsDayColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />}
        <Select
          label={getImageRowById("Table",sutil.colorOptions(settingsStorage,C.SettingsTableColor),sutil.getSettingsArray(settingsStorage)[C.SettingsTableColor])}
          selectViewTitle="Table's color"
          settingsKey="SettingsTableColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsTableColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Table > Nails",sutil.colorOptions(settingsStorage,C.SettingsNailColor),sutil.getSettingsArray(settingsStorage)[C.SettingsNailColor])}
          selectViewTitle="Nails on the table color"
          settingsKey="SettingsNailColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsNailColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Heart Rate",sutil.colorOptions(settingsStorage,C.SettingsHRColor),sutil.getSettingsArray(settingsStorage)[C.SettingsHRColor])}
          selectViewTitle="HR-value color"
          settingsKey="SettingsHRColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsHRColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Steps",sutil.colorOptions(settingsStorage,C.SettingsStepsColor),sutil.getSettingsArray(settingsStorage)[C.SettingsStepsColor])}
          selectViewTitle="Steps-value color"
          settingsKey="SettingsStepsColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsStepsColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("AZM",sutil.colorOptions(settingsStorage,C.SettingsAZMColor),sutil.getSettingsArray(settingsStorage)[C.SettingsAZMColor])}
          selectViewTitle="Active Zone Minutes color"
          settingsKey="SettingsAZMColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsAZMColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Distance",sutil.colorOptions(settingsStorage,C.SettingsDistanceColor),sutil.getSettingsArray(settingsStorage)[C.SettingsDistanceColor])}
          selectViewTitle="Distance value color"
          settingsKey="SettingsDistanceColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsDistanceColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Calories",sutil.colorOptions(settingsStorage,C.SettingsCaloriesColor),sutil.getSettingsArray(settingsStorage)[C.SettingsCaloriesColor])}
          selectViewTitle="Calories value color"
          settingsKey="SettingsCaloriesColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsCaloriesColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Floors",sutil.colorOptions(settingsStorage,C.SettingsFloorsColor),sutil.getSettingsArray(settingsStorage)[C.SettingsFloorsColor])}
          selectViewTitle="Floors value color"
          settingsKey="SettingsFloorsColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsFloorsColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Select
          label={getImageRowById("Battery",sutil.colorOptions(settingsStorage,C.SettingsBatteryColor),sutil.getSettingsArray(settingsStorage)[C.SettingsBatteryColor])}
          selectViewTitle="Battery value color"
          settingsKey="SettingsBatteryColor"
          options={sutil.colorOptions(settingsStorage,C.SettingsBatteryColor)}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        
      </Section>}
       
      { connectionOK() && <Section
        title={<Text bold align="left">⚙️ - OTHER SETTINGS</Text>}>
        <Select
          label={getImageRowById("12/24-hour clock",C.units24hOptions,sutil.getSettingsArray(settingsStorage)[C.SettingsUnits24h])}
          selectViewTitle="24h or 12h time format"
          settingsKey="units24h"
          options={C.units24hOptions}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
        <Toggle settingsKey="showAmPm" label={`Show AM/PM on 12h time format`} onChange={state => selectUpdate()} />
        <Select
          label={getImageRowById("Distance unit",C.unitsDistanceOptions,sutil.getSettingsArray(settingsStorage)[C.SettingsUnitsDistance])}
          selectViewTitle="Unit family to use for distances"
          settingsKey="unitsDistance"
          options={C.unitsDistanceOptions}
          renderItem={
              ({ name, value }) => getImageRow(name,value)
          }
          onSelection={selection => selectUpdate()}
        />
      </Section>}
    </Page>
  );
}

registerSettingsPage(mySettings);

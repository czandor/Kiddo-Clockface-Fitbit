// version: 210113

export const APP_LOG = 0;
export const COMPANION_LOG = 0;
export const SETTINGS_LOG = 0;


export const MONTHNAMES_DEFAULT= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const WEEKDAYS_DEFAULT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHNAMES_LONG_DEFAULT = ['January','February','March','April','May','June','July','August','September','October','November','December'];
export const WEEKDAYS_LONG_DEFAULT = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];



export const MessageTypePing = 0;
export const MessageTypePong = 1;
export const MessageTypeSettings = 2;
export const MessageTypeName = 3;


export const COLOR_RANDOM  = 255;
export const COLOR_RANDOM_CHAR  = 254;

export const SettingsBGColor        = 0;
export const SettingsWeekColor      = 1;
export const SettingsAmPmColor      = 2;
export const SettingsHourColor      = 3;
export const SettingsDDotColor      = 4;
export const SettingsMinuteColor    = 5;
export const SettingsMonthColor     = 6;
export const SettingsDayColor       = 7;
export const SettingsTableColor     = 8;
export const SettingsNailColor      = 9;
export const SettingsHRColor        = 10;
export const SettingsStepsColor     = 11;
export const SettingsAZMColor       = 12;
export const SettingsDistanceColor  = 13;
export const SettingsCaloriesColor  = 14;
export const SettingsFloorsColor    = 15;
export const SettingsBatteryColor   = 16;
export const SettingsUnitsDistance  = 17;
export const SettingsUnits24h       = 18;
export const SettingsShowAmPm       = 19;
export const SettingsTimeColor      = 20;
export const SettingsDateColor      = 21;

export const UnitsDefault    =0;
export const UnitsMetric     =1;
export const UnitsUS         =2;


export const SettingsDefaults=[
  COLOR_RANDOM, //0
  COLOR_RANDOM_CHAR, //1
  COLOR_RANDOM_CHAR, //2
  COLOR_RANDOM_CHAR, //3
  COLOR_RANDOM, //4
  COLOR_RANDOM_CHAR, //5
  COLOR_RANDOM_CHAR, //6
  COLOR_RANDOM_CHAR, //7
  COLOR_RANDOM, //8
  42, //9
  COLOR_RANDOM, //10
  COLOR_RANDOM, //11
  COLOR_RANDOM, //12
  COLOR_RANDOM, //13
  COLOR_RANDOM, //14
  COLOR_RANDOM, //15
  COLOR_RANDOM_CHAR, //16
  UnitsDefault, //17
  UnitsDefault, //18
  1, //19
  COLOR_RANDOM_CHAR, //20
  COLOR_RANDOM_CHAR //21
];


export const HEALTH_steps             =0;
export const HEALTH_distance          =1;
export const HEALTH_calories          =2;
export const HEALTH_elevationGain     =3;
export const HEALTH_activeZoneMinutes =4;

export const SIZES={ 
  'big':{
    //'0':[3,74],
    '0':[8,65],
    '1':[20,40],
    '2':[14,52],
    '3':[15,49],
    '4':[10,60],
    '5':[18,44],
    '6':[16,48],
    '7':[17,46],
    '8':[13,53],
    '9':[15,50],
    'ddot':[28,22],
    'spacer': [0,4],
    ' ':[0,20]
  },
  'small':{
    //'0':[1,23],
    '0':[2,21],
    '1':[6,13],
    '2':[4,16],
    '3':[5,15],
    '4':[3,19],
    '5':[5,14],
    '6':[5,15],
    '7':[5,15],
    '8':[4,17],
    '9':[5,15],
    'a':[3,20],
    'b':[5,15],
    'c':[5,15],
    'd':[5,15],
    'e':[6,13],
    'f':[6,13],
    'g':[5,15],
    'h':[4,16],
    'i':[8,9],
    'j':[4,17],
    /*'k':[5,15],*/
    'l':[6,13],
    'm':[1,23],
    'n':[3,18],
    'o':[2,21],
    'p':[4,17],
    /*'q':[5,15],*/
    'r':[4,17],
    's':[4,16],
    't':[4,17],
    'u':[3,19],
    'v':[3,19],
    'w':[1,24],
    /*'x':[5,15],*/
    'y':[2,22],
    /*'z':[5,15],*/
    'dot':[9,7],
    'spacer':[0,1],
    ' ':[0,8]
  }
};


class pebblecolor {
  constructor(name,vivid,normal,enabled){
    this.enabled=enabled;
    this.normal=''+normal;
    this.vivid=''+vivid;
    this.name=name;
  }
  getColor(vivid){
    if(!vivid) return '#'+this.normal;
    return '#'+this.vivid;
  }
  getName(){
    return this.name;
  }
  isEnabled(){
    return this.enabled;
  }
}
export const colors=[
  new pebblecolor("Black","000000","000000",false), //0
  new pebblecolor("Oxford Blue","000055","001E41",false), //1
  new pebblecolor("Duke Blue","0000AA","004387",false), //2
  new pebblecolor("Blue","0000FF","0068CA",false), //3
  new pebblecolor("Dark Green","005500","2B4A2C",false), //4
  new pebblecolor("Midnight Green","005555","27514F",false), //5
  new pebblecolor("Cobalt Blue","0055AA","16638D",true), //6
  new pebblecolor("Blue Moon","0055FF","007DCE",true), //7
  new pebblecolor("Islamic Green","00AA00","5E9860",true), //8
  new pebblecolor("Jaeger Green","00AA55","5C9B72",true), //9
  new pebblecolor("Tiffany Blue","00AAAA","57A5A2",true), //10
  new pebblecolor("Vivid Cerulean","00AAFF","4CB4DB",true), //11
  new pebblecolor("Green","00FF00","8EE391",true), //12
  new pebblecolor("Malachite","00FF55","8EE69E",true), //13
  new pebblecolor("Medium Spring Green","00FFAA","8AEBC0",true), //14
  new pebblecolor("Cyan","00FFFF","84F5F1",true), //15
  new pebblecolor("Bulgarian Rose","550000","4A161B",false), //16
  new pebblecolor("Imperial Purple","550055","482748",false), //17
  new pebblecolor("Indigo","5500AA","40488A",false), //18
  new pebblecolor("Electric Ultramarine","5500FF","2F6BCC",true), //19
  new pebblecolor("Army Green","555500","564E36",false), //20
  new pebblecolor("Dark Gray","555555","545454",false), //21
  new pebblecolor("Liberty","5555AA","4F6790",true), //22
  new pebblecolor("Very Light Blue","5555FF","4180D0",true), //23
  new pebblecolor("Kelly Green","55AA00","759A64",true), //24
  new pebblecolor("May Green","55AA55","759D76",true), //25
  new pebblecolor("Cadet Blue","55AAAA","71A6A4",true), //26
  new pebblecolor("Picton Blue","55AAFF","69B5DD",true), //27
  new pebblecolor("Bright Green","55FF00","9EE594",true), //28
  new pebblecolor("Screamin Green","55FF55","9DE7A0",true), //29
  new pebblecolor("Medium Aquamarine","55FFAA","9BECC2",true), //30
  new pebblecolor("Electric Blue","55FFFF","95F6F2",true), //31
  new pebblecolor("Dark Candy Apple Red","AA0000","99353F",true), //32
  new pebblecolor("Jazzberry Jam","AA0055","983E5A",false), //33
  new pebblecolor("Purple","AA00AA","955694",false), //34
  new pebblecolor("Vivid Violet","AA00FF","8F74D2",true), //35
  new pebblecolor("Windsor Tan","AA5500","9D5B4D",true), //36
  new pebblecolor("Rose Vale","AA5555","9D6064",true), //37
  new pebblecolor("Purpureus","AA55AA","9A7099",true), //38
  new pebblecolor("Lavender Indigo","AA55FF","9587D5",true), //39
  new pebblecolor("Limerick","AAAA00","AFA072",true), //40
  new pebblecolor("Brass","AAAA55","AEA382",true), //41
  new pebblecolor("Light Gray","AAAAAA","ABABAB",true), //42
  new pebblecolor("Baby Blue Eyes","AAAAFF","A7BAE2",true), //43
  new pebblecolor("Spring Bud","AAFF00","C9E89D",true), //44
  new pebblecolor("Inchworm","AAFF55","C9EAA7",true), //45
  new pebblecolor("Mint Green","AAFFAA","C7F0C8",true), //46
  new pebblecolor("Celeste","AAFFFF","C3F9F7",true), //47
  new pebblecolor("Red","FF0000","E35462",true), //48
  new pebblecolor("Folly","FF0055","E25874",true), //49
  new pebblecolor("Fashion Magenta","FF00AA","E16AA3",true), //50
  new pebblecolor("Magenta","FF00FF","DE83DC",true), //51
  new pebblecolor("Orange","FF5500","E66E6B",true), //52
  new pebblecolor("Sunset Orange","FF5555","E6727C",true), //53
  new pebblecolor("Brilliant Rose","FF55AA","E37FA7",true), //54
  new pebblecolor("Shocking Pink","FF55FF","E194DF",true), //55
  new pebblecolor("Chrome Yellow","FFAA00","F1AA86",true), //56
  new pebblecolor("Rajah","FFAA55","F1AD93",true), //57
  new pebblecolor("Melon","FFAAAA","EFB5B8",true), //58
  new pebblecolor("Rich Brilliant Lavender","FFAAFF","ECC3EB",true), //59
  new pebblecolor("Yellow","FFFF00","FFEEAB",true), //60
  new pebblecolor("Icterine","FFFF55","FFF1B5",true), //61
  new pebblecolor("Pastel Yellow","FFFFAA","FFF6D3",true), //62
  new pebblecolor("White","FFFFFF","FFFFFF",false) //63
]; 
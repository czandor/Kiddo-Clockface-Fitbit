export * from "../common/const";
import * as C from "../common/const";

export const unitsDistanceOptions=[
    {name:"Default setting",   value:{id:""+C.UnitsDefault,info:'From Fitbit Setup',icon:'https://czandor.hu/fitbit/amongus/fitbit.png'}},
    {name:"Metric (meter, km)",   value:{id:""+C.UnitsMetric,info:'Always Metric',icon:'https://czandor.hu/fitbit/amongus/metric.png'}},
    {name:"US (miles)",   value:{id:""+C.UnitsUS,info:'Always Imperial',icon:'https://czandor.hu/fitbit/amongus/imperial.png'}}
  ];

export const units24hOptions=[
    {name:"Default setting",   value:{id:""+C.UnitsDefault,info:'From Fitbit Setup',icon:'https://czandor.hu/fitbit/amongus/fitbit.png'}},
    {name:"24h",   value:{id:""+C.UnitsMetric,info:'Always 24-hour clock',icon:'https://czandor.hu/fitbit/amongus/h24.png'}},
    {name:"12h",   value:{id:""+C.UnitsUS,info:'Always 12-hour clock',icon:'https://czandor.hu/fitbit/amongus/h12.png'}}
  ];


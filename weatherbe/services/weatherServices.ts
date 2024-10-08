import { IWeatherData } from "../types/types";
import api from "./api";
const get=(lat:number,lon:number)=>{
    const params = new URLSearchParams();
    let url = api.url.weather;
    params.append("lat", String(lat));
    params.append('lon',String(lon));
    params.append('lang','vi')
    params.append("appid",process.env.API_KEY_WEATHER??"");
    url += "?" + params.toString();
    return api.get<IWeatherData>(url).then(res=>res.data)
}
const weatherService={
    get
}
export default weatherService
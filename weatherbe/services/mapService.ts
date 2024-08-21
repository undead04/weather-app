
import api from "./api"

const get=(layer:string,z:number,x:number,y:number)=>{
    const params = new URLSearchParams();
    let url=`${api.url.map}/${layer}/${z}/${x}/${y}`
    params.append('appid',process.env.REACT_APP_API_KEY??"")
    url+="?"+params.toString();
    return url
}
const mapService={
    get
}
export default mapService

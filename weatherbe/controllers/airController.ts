import { Request,Response,NextFunction } from "express"
import { removeDiacritics } from "../utils/utilsFuncion";
import addressService from "../services/addressService";
import airService from "../services/airService";
const get=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const state:string=String(req.query.state);
        const county:string=String(req.query.county);
        const query:string=removeDiacritics(`${county}, ${state}, VN`)
        const addressRes=await addressService.get(query).then(res=>res)
        if(addressRes.length<=0){
            return res.status(404).json("Địa điêm này không hổ trợ để dự báo thời tiết");
        }
        const lat=addressRes[0].lat;
        const lon=addressRes[0].lon;
        const data=await airService.getCurrent(lat,lon).then(res=>res)
        return res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
    
}
const airController={
    get
}
export default airController
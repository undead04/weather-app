import { Request,Response,NextFunction } from "express"
import weatherService from "../services/weatherServices"
import { removeDiacritics } from './../utils/utilsFuncion';
import addressService from './../services/addressService';
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
        const data= await weatherService.get(lat,lon)
        return res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
}
const weatherController={
    get
}
export default weatherController
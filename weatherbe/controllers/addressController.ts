import { Request,Response,NextFunction } from "express"
import countyService from './../services/countyServices';
import addressService from "../services/addressService";
import { removeDiacritics } from "../utils/utilsFuncion";
const get=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const state:string=String(req.query.state)
        const country:string=String(req.query.country)
        const query:string=removeDiacritics(`${country}, ${state}, VN`)
        const addressRes=await addressService.get(query).then(res=>res)
        if(addressRes.length<=0){
            return res.status(404).json("Địa điêm này không hổ trợ để dự báo thời tiết");
        }
        return res.status(200).json(addressRes)
    }catch(error:any){
        res.status(500).json(error)
    }
}
const addressController={
    get
}
export default addressController
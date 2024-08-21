import { Request,Response,NextFunction } from "express"
import IconService from "../services/IconService"
const list=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const nameIcon:string=String(req.query.nameIcon)
        const data= await IconService.get(nameIcon)
        res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
    
}
const iconContrller={
    list
}
export default iconContrller
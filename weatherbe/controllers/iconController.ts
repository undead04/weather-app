import { Request,Response,NextFunction } from "express"
import IconService from "../services/IconService"
import axios from "axios"
const get=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const nameIcon:string=String(req.params.nameIcon)
        const data= await IconService.get(nameIcon)
        const response = await axios.get(data, { responseType: 'stream' });
        res.setHeader('Content-Type', 'image/png');
        response.data.pipe(res);
    }catch(error:any){
        res.status(500).json(error)
    }
    
}
const iconContrller={
    get
}
export default iconContrller
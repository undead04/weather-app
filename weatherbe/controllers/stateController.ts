import { Request,Response,NextFunction } from "express"
import stateService from "../services/stateServices"
const list=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const name:string=req.query.name as string;
        const page:number=Number(req.query.page)||1;
        const pageSize:number=Number(req.query.pageSize)
        const data= await stateService.list(name,page,pageSize)
        res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
    
}
const get=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id=req.params.id;
        const data=await stateService.get(id)
        if(!data){
            res.status(404).json(data)
        }
        res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
}
const stateController={
    get,list
}
export default stateController
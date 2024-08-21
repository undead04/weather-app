import { Request,Response,NextFunction } from "express"
import countyService from './../services/countyServices';
const list=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const name:string=req.query.name as string;
        const page:number=Number(req.query.page)||1;
        const pageSize:number=Number(req.query.pageSize)
        const state:string=req.query.state as string;
        const data= await countyService.list(name,state,page,pageSize)
        res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
    
}
const get=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const id=req.params.id;
        const data=await countyService.get(id)
        if(!data){
            res.status(404).json(data)
        }
        res.status(200).json(data)
    }catch(error:any){
        res.status(500).json(error)
    }
}
const countryController={
    get,list
}
export default countryController
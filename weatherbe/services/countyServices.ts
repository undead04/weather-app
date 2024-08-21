
import County, { ICounty } from "../models/county";
import mongoose from "mongoose";
import {normalizeString, removeAccents, removeDiacritics, shuffleArray} from "../utils/utilsFuncion";
import addressService from './addressService';
const commonPipeline=[
    {
        $lookup:{
            from:"states",
            localField:'state',
            foreignField: '_id',
            as: 'state'
        }   
    },
    { $unwind: '$state' },
]
const list = async (name?: string,state?:string, page: number = 1, pageSize?: number): Promise<{data:ICounty[],currentPage:number,totalPage:number}> => {
    let query: any = {};
    
    if (name) {
        name=normalizeString(name)
        query={
            $or: [
                { name:  {$regex:new RegExp(name, "i")} },
                { 'state.name':{$regex:  new RegExp(name, "i") }}
            ]
        }
    }
    if(state){
        query['state']=new mongoose.Types.ObjectId(state)
    }
    
    const countPipeline = [
        ...commonPipeline,
        { $match: query },
        { $count: 'totalDocuments' }
    ];
    const countResult = await County.aggregate(countPipeline);
    const totalDocument = countResult.length > 0 ? countResult[0].totalDocuments : 0;
    const limit = pageSize?pageSize:totalDocument
    const skip = (page - 1) * limit;
    const totalPage = Math.ceil(totalDocument / limit);
    const currentPage = Math.min(page, totalPage || 1);
    const data: ICounty[] = await County.aggregate(
        [
            ...commonPipeline,
            {$match:query},
            {$sort:{name:1}},
            {$skip:skip},
            {$limit:limit}
        ]
    )
    return{
        data:data,
        currentPage:page,
        totalPage:totalPage
    }
};
const get=async(id:string):Promise<ICounty|string>=>{
    const data:ICounty|null=await County.findById(id).populate('state')
        if(data){
            return data
        }
        return "Không tìm thấy quận huyện  này tại Việt Nam"
}
const listRandom=async():Promise<ICounty[]>=>{
   const data:ICounty[]=await County.aggregate([
    ...commonPipeline,
    {$sample:{size:20}}
   ])
   console.log(data)
   return data
}
const countyService={
    get,list,listRandom
}
export default countyService
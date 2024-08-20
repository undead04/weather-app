
import State, { IState } from "../models/state"
const list = async (name?: string, page: number=1, pageSize?:number): Promise<{data:IState[],currentPage:number,totalPage:number}> => {
    const query: any = {};
    if (name) {
        query['name'] = { $regex: name, $options: 'i' }; // Sử dụng biến name
    }
    const totalDocument=await State.find(query).countDocuments()
    const limit = pageSize?pageSize:totalDocument
    const skip = (page - 1) * limit;
    const totalPage=Math.ceil(totalDocument/limit)
    const data: IState[] = await State.find(query).sort({ name: 1 }).skip(skip).limit(limit);
    return {
        data:data,
        currentPage:page,
        totalPage:totalPage
    };
};
const get=async(id:string):Promise<IState|string>=>{
    const data:IState|null=await State.findById(id)
        if(data){
            return data
        }
        return "Không tìm thấy tỉnh thành này tại Việt Nam"
}
const stateService={
    get,list
}
export default stateService
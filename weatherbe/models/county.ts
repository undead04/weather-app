import mongoose,{Schema,Document} from "mongoose"
import { IState } from "./state";
export interface ICounty extends Document{
   name:string,
   state:IState
}
const CountySchema:Schema=new Schema({
   name:{type:String,require},
    state:{type:Schema.Types.ObjectId,ref:"state",require}
   
})
const County = mongoose.model<ICounty>('county', CountySchema);
export default County
import mongoose,{Document, Schema} from "mongoose"
export interface IState extends Document{
    _id:string,
    name:string
}
const StateSchema:Schema=new Schema({
    name:{type:String,require}
})
const State=mongoose.model<IState>('state',StateSchema)
export default State
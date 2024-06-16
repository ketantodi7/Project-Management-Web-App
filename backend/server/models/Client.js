import {Schema, model} from "mongoose";

const ClientSchema = new Schema({
name :{
    type:String
},
email :{
    type:String,
    unique:true,
    required:true
},
phone :{
    type:String
}
})

const Client  = model('Client', ClientSchema);
Client.createIndexes();
export default Client
import { model, Schema } from "mongoose";
import { maintenanceType } from "../../src/utils/constant/enums.js";

//schema
const maintenanceSchema = new Schema({
    studentName:{
        type:String,
        trim:true
    },
    floorNumber:Number,
    apartment_room:String,
    maintenanceType:{
        type:String,
        enum:Object.values(maintenanceType),
    },
    description:String

},{timestamps:true})


//model
export const Maintenance = model('Maintenance',maintenanceSchema)
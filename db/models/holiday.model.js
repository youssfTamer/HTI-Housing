import { model, Schema } from "mongoose";

export const holidaySchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    fatherPhoneNumber: {
        type: String,
        required: true,
    },
    motherPhoneNumber: {
        type: String,
        required: true,
    },
    parentNationalId: {
        type: String,
        required: true,
    },
    image: {
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
}, { timestamps: true })

export const Holiday = model('Holiday', holidaySchema)


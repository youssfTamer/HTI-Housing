import { model, Schema } from "mongoose";
import { Days } from "../../src/utils/constant/enums.js";

export const delaySchema = new Schema({
    selectedDays: {
        type: String,
        required: true,
        enum: Object.values(Days)
    },
    fullName: {
        type: String,
        required: true
    },
    fatherPhoneNumber: {
        type: String,
        required: true
    },
    motherPhoneNumber: {
        type: String,
        required: true
    },
    parentNationalId: {
        type: Number,
        required: true
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
}, { timestamps: true });

export const Delay = model('Delay', delaySchema);
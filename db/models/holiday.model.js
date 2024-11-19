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
    guardianIdCard: {
        type: String,  // This will store the file path or URL to the uploaded ID card
        required: true,
    }
}, { timestamps: true })

export const Holiday = model('Holiday', holidaySchema)


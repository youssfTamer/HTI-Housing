import { model, Schema } from "mongoose";



export const warningSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    room: {
        type: Number ,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    warningCount:{
        type: Number,
        default: 0, 
    }
}, { timestamps: true })

export const Warning = model('Warning', warningSchema)
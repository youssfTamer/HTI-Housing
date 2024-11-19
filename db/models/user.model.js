import { model, Schema } from "mongoose";
import { roles, status, departments, gender } from "../../src/utils/constant/enums.js";

//schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ID:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: Object.values(departments)
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(gender)
    },
    role: {
        type: String,
        enum: Object.values(roles),
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: status.PENDING
    },
    image: {
        secure_url: { type: String, required: false },
        public_id: { type: String, required: false }
    },
    DOB: { type: String, default: Date.now() }
}, { timestamps: true })

//model
export const User = model('User', userSchema)
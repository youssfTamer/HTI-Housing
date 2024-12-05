import {Schema,model} from 'mongoose';
import { gender, roles, status } from '../../src/utils/constant/enums.js';

//schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(roles),
        required: true
    },
    status: {
        type: String,
        enum: Object.values(status),
        default: status.PENDING
    },
    // Student-specific fields
    ID: {
        type: String,
        sparse: false,  // Allows null/undefined values
        unique: true
    },
    department: {
        type: String,
        required: function() {
            return this.role === roles.STUDENT;
        }
    },
    // Staff-specific fields
    buildingName: {
        type: String,
        required: function() {
            return this.role === roles.STAFF;
        }
    },
    role: {
        type: String,
        enum: Object.values(roles),
    },
    gender: {
        type: String,
        enum: Object.values(gender),
        required: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// Add any necessary indexes
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 }, { sparse: true });
userSchema.index({ ID: 1 }, { sparse: true });

export const User = model('User', userSchema);
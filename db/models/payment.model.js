import { model, Schema } from 'mongoose';
import { paymentStatus } from '../../src/utils/constant/enums.js';

const paymentSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    receiptImage: {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    },
    status: {
        type: String,
        enum: Object.values(paymentStatus),
        default: paymentStatus.PENDING
    },
    adminComment: {
        type: String
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    },
    user: { // Add this line to include user reference
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true // Make it required if necessary
    }
}, { timestamps: true });


paymentSchema.virtual('userDetails', {
    ref: 'User', // The model to use
    localField: 'user', // The field in the payment model
    foreignField: '_id', // The field in the user model
});


export const Payment = model('Payment', paymentSchema);

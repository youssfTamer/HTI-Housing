import { Payment, Booking } from '../../../db/index.js';
import { AppError } from '../../utils/appError.js';
import { paymentStatus, bookingStatus } from '../../utils/constant/enums.js';
import cloudinary from '../../utils/cloud.js'

export const createPayment = async (req, res, next) => {
    const { booking: bookingId } = req.body;
    const student = req.authUser._id;

    // Check if booking exists and belongs to student
    const booking = await Booking.findOne({ _id: bookingId, student });
    if (!booking) {
        return next(new AppError('Booking not found or unauthorized', 404));
    }

    // Upload receipt image to Cloudinary
    let receiptImage;
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: 'SHMS/receipts'
        });
        receiptImage = { secure_url, public_id };
    } else {
        return next(new AppError('Receipt image is required', 400));
    }

    // Create payment
    const payment = await Payment.create({
        booking: bookingId,
        receiptImage
    });

    await payment.populate('booking');

    res.status(201).json({
        success: true,
        message: 'Payment submitted successfully',
        data: payment
    });
};

export const reviewPayment = async (req, res, next) => {
    const { paymentId } = req.params;
    const { status, adminComment } = req.body;
    const admin = req.authUser._id;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
        return next(new AppError('Payment not found', 404));
    }

    // Update payment status
    payment.status = status;
    payment.adminComment = adminComment;
    payment.reviewedBy = admin;
    payment.reviewedAt = new Date();
    await payment.save();

    // Update booking status based on payment review
    const booking = await Booking.findById(payment.booking);
    booking.bookingStatus = status === paymentStatus.APPROVED ? 
        bookingStatus.CONFIRMED : bookingStatus.REJECTED;
    await booking.save();

    res.status(200).json({
        success: true,
        message: `Payment ${status} successfully`,
        data: payment
    });
};


import { Booking, Room, Payment } from '../../../db/index.js';
import { AppError } from '../../utils/appError.js';
import { bookingStatus } from '../../utils/constant/enums.js';
import { messages } from '../../utils/constant/messages.js';
import { createPayment } from '../payment/payment.controller.js'; // Import payment function

export const createBooking = async (req, res, next) => {
    const { room: roomId, checkIn, checkOut } = req.body;
    const student = req.authUser._id; // From auth middleware


    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
        return next(new AppError(messages.room.notFound, 404))
    }

    // Check if student has any existing bookings for the same dates
    const existingStudentBooking = await Booking.findOne({
        student,
        bookingStatus: bookingStatus.CONFIRMED,
        $or: [
            {
                checkIn: { $lte: checkOut },
                checkOut: { $gte: checkIn }
            }
        ]
    });

    if (existingStudentBooking) {
        return next(new AppError(messages.booking.studentAlreadyBooked, 400))
    }

    // Check if room is already booked for the given dates
    const existingRoomBooking = await Booking.findOne({
        room : roomId,
        bookingStatus: bookingStatus.CONFIRMED,
        $or: [
            {
                checkIn: { $lte: checkOut },
                checkOut: { $gte: checkIn }
            }
        ]
    });

    if (existingRoomBooking) {
        return next(new AppError(messages.booking.roomAlreadyBooked, 400))
    }


    // Create booking
    const booking = await Booking.create({
        room : roomId,
        student,
        checkIn,
        checkOut
    });

    // Populate room and student details
    await booking.populate([
        { path: 'room', select: 'roomNumber type price' },
        { path: 'student', select: 'name email phone' }
    ]);

    // Return booking details for payment
    res.status(201).json({
        message: messages.booking.createdSuccessfully,
        success: true,
        data: booking
    });
}

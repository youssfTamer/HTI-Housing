export const status = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    WAITING_ADMIN_APPROVAL: 'waiting_admin_approval'
}
Object.freeze(status)

//todo: add more roles
export const roles = {
    STUDENT: 'student',
    STAFF: 'staff',
    MANAGER: 'manager',
    DASHBOARD_ADMIN:"dashboard admin"
}
Object.freeze(roles)

export const gender = {
    MALE: 'male',
    FEMALE: 'female'
}
Object.freeze(gender)

export const roomType = {
    SINGLE: 'single',
    DOUBLE: 'double',
    BOTH: 'both'
}
Object.freeze(roomType)

export const amenities = {
    LAUNDRY: 'laundry',
    STUDY_ROOM: 'study room',
    CAFETERIA: 'cafeteria',
    WIFI: 'wifi',
    COURT: 'court',
    PINGPONG: 'pingpong'
}
Object.freeze(amenities)

export const departments = {
    CS: 'cs',
    CE: 'civil engineering',
    EE: 'electrical engineering',
    ME: 'mechanical engineering',
    BE: 'biological engineering',
    BM: 'business management'
}
Object.freeze(departments)

export const maintenanceType = {
    ELECTRICAL: 'electrical',
    PLUMBING: 'plumbling',
    AIR_CONDITIONING: 'air conditioning',
    OTHER: 'other'
}
Object.freeze(maintenanceType)

export const Days = {
    SUNDAY: 'sunday',
    MONDAY: 'monday',
    TUESDAY: 'tuesday',
    WEDNESDAY: 'wednesday',
    THURSDAY: 'thursday',
    FRIDAY: 'friday',
    SATURDAY: 'saturday'
}
Object.freeze(Days)

export const roomStatus = {
    BOOKED:"booked",
    EMPTY:"empty",
    PENDING:"pending",
}
Object.freeze(roomStatus)

export const bookingStatus = {
    PENDING: 'pending',          // Initial state when booking is created
    PAYMENT_PENDING: 'payment_pending', // Waiting for payment
    CONFIRMED: 'confirmed',      // Booking has been approved/confirmed
    IN_PROGRESS: 'in_progress',  // Booking is currently active
    CANCELLED: 'cancelled',      // Booking has been cancelled
    COMPLETED: 'completed',      // Booking period has ended successfully
    REJECTED: 'rejected',        // Booking was rejected by admin/system
    EXPIRED: 'expired'           // Booking expired without confirmation
}
Object.freeze(bookingStatus)

export const paymentStatus = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
};
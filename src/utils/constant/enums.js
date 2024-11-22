export const status = {
    PENDING: 'pending to verify',
    VERIFIED: 'verified',
    BLOCKING: 'blocked'
}
Object.freeze(status)

//todo: add more roles
export const roles = {
    STUDENT: 'student',
    STAFF: 'staff',
    MANAGER: 'manager'
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
const generateMessage = (entity) => ({

    alreadyExist: `${entity} already exist`,
    notFound: `${entity} not found`,
    createdSuccessfully: `${entity} created successfully`,
    updatedSuccessfully: `${entity} updated successfully`,
    deletedSuccessfully: `${entity} deleted successfully`,
    failToCreate: `fail to create ${entity}`,
    failToUpdate: `fail to update ${entity}`,
    failToDelete: `fail to delete ${entity}`,

})

export const messages = {
    user: { ...generateMessage('user'), invalidVerification: 'Invalid verification status', invalidToken: "Invalid token", verified: 'Account verified Successfully', invalidCredentails: 'invalid credentails', LoginSuccessfully: 'login successfully', notAuthorized: 'not authorized to access this api', genderNotAuthorized: 'gender not Authorized to access this api', invalidRole: 'Invalid role', adminApproval: 'Your account is pending admin approval', pleaseVerify: 'Please verify your account first' },
    sendEmail: { ...generateMessage('EmailService'), failtoOTP: 'fail To Send OTP Email', sendSuccessfully: 'OTP send Successfully', failToSend: 'fail to send mail' },
    OTP: { ...generateMessage('OTP'), ReuseOTP: 'OTP Has been Already Used', },
    maintenance: generateMessage('maintenance'),
    delay: generateMessage('delay'),
    holiday: generateMessage('holiday'),
    housing: generateMessage('housing'),
    building: generateMessage('building'),
    room: generateMessage('room'),
    apartment: generateMessage('apartment'),
    floor: generateMessage('floor'),
    warning: generateMessage('warning'),
    booking: { ...generateMessage('booking'), studentAlreadyBooked: 'You already have a booking for these dates', roomAlreadyBooked: 'Room is already booked for these dates' }
}
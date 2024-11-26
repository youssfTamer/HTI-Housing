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
    student: { ...generateMessage('student'), verified: 'student verified Successfully', invalidCredentails: 'invalid credentails', LoginSuccessfully: 'login successfully', notAuthorized: 'not authorized to access this api' },
    review: generateMessage('review'),
    maintenance:generateMessage('maintenance'),
    delay: generateMessage('delay'),
    housing: generateMessage('housing'),
    building: generateMessage('building'),
    room: generateMessage('room'),
    apartment: generateMessage('apartment'),
    sendEmail: { ...generateMessage('EmailService'), failtoOTP: 'fail To Send OTP Email',sendSuccessfully: 'OTP send Successfully' }
}
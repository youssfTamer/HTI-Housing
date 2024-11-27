import bcrypt from 'bcrypt'
import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import { status } from '../../utils/constant/enums.js'
import { sendEmail } from '../../utils/email.js'
import { generateToken, verifyToken } from "../../utils/token.js"

export const signupForStudent = async (req, res, next) => {

    //get data from req 
    let { ID, name, email, password } = req.body

    //check existenc
    const studentExist = await User.findOne({ ID });
    if (studentExist) {
        return next(new AppError(messages.student.alreadyExist, 409))
    }

    //prepare data
    //hash password
    password = bcrypt.hashSync(password, 5)
    const user = new User({
        name,
        email,
        password,
        ID
    })

    //save to db
    const createdStudent = await user.save()
    if (!createdStudent) {
        req.failAuth = ID
        return next(new AppError(messages.student.failToCreate, 500))
    }
    //generate token
    const token = generateToken({ payload: { email, _id: createdStudent._id } });
    //send email
    const isEmailAccepted = await sendEmail({ to: email, subject: 'verify your account', html: `<p>click on link to verify yout account <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}">link</a> </p>` })
    if (!isEmailAccepted) {
        return next(new AppError(messages.sendEmail.failToCreate, 500))
    }
    //send response
    return res.status(201).json({
        message: messages.student.createdSuccessfully,
        success: true,
        data: createdStudent
    })
}


export const verifyAccount = async (req, res, next) => {
    //get data from req
    const { token } = req.params
    const payload = verifyToken({ token })
    await User.findOneAndUpdate({ email: payload.email, status: status.PENDING }, { status: status.VERIFIED })
    return res.status(200).json({ message: messages.student.verified, success: true })
}


export const login = async (req, res, next) => {

    //get data from req
    const { email, password } = req.body
    const studentExist = await User.findOne({ email, status: status.VERIFIED })
    if (!studentExist) {
        return next(new AppError(messages.student.invalidCredentails, 400))
    }

    //check password
    const match = bcrypt.compareSync(password, studentExist.password)
    if (!match) {
        return next(new AppError(messages.student.invalidCredentails, 400))
    }
    //generate Token
    const token = generateToken({ payload: { _id: studentExist._id, email } })

    //send response
    return res.status(200).json({
        message: messages.student.LoginSuccessfully,
        success: true,
        token
    })
}


export const forgetPassword = async (req, res, next) => {
    //get data from req
    const { email } = req.body
    //check existenc
    const studentExist = await User.findOne({ email })
    if (!studentExist) {
        return next(new AppError(messages.student.notFound, 404))
    }
    //send OTP
    const otp = crypto.randomBytes(3).toString('hex')
    studentExist.resetPasswordToken = otp
    studentExist.resetPasswordExpires = Date.now() + 3600000
    //add to db
    await studentExist.save()
    //send OTP Email 
    const sendOtpEmail = await sendEmail({ to: email, subject: 'Password Reset OTP', html: `Your OTP code for password reset is: ${otp}` })
    if (!sendOtpEmail) {
        return next(new AppError(messages.sendEmail.failtoOTP, 500))
    }

    //send response
    return res.status(200).json({
        message: messages.sendEmail.sendSuccessfully,
        success: true
    })
}

export let resetPassword = async (req, res, next) => {
    let { OTP, expiresIn, newPassword } = req.body
    if (OTP && expiresIn >= Date.now()) {
        let OTPCheck = await User.findOne({ OTP, expiresIn });
        console.log(OTPCheck);
        if (!OTPCheck) {
            return next(new AppError(messages.OTP.ReuseOTP, 404));
        }
        OTPCheck.password = bcrypt.hashSync(newPassword, 5)
        OTPCheck.OTP = ""
        OTPCheck.expiresIn = 0
        OTPCheck.save()
        return res.status(201).json({ message: 'Password has been rested successfully' });
    }
    return next(new AppError("Invailed Or Expired OTP", 401 ));
}

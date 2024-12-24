import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { User } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import { roles, status } from '../../utils/constant/enums.js'
import { sendEmail } from '../../utils/email.js'
import { generateToken, verifyToken } from "../../utils/token.js"


export const signup = async (req, res, next) => {
    // get data from req 
    let { ID, name, email, password, role, department, gender, phone } = req.body

    // check existence
    const userExist = await User.findOne({ 
        $or: [{ ID }, { email }, { phone }]
    });
    if (userExist) {
        return next(new AppError(messages.user.alreadyExist, 409))
    }

    // Set initial status based on role
    let initialStatus;
    switch (role) {
        case roles.STUDENT:
            initialStatus = status.WAITING_ADMIN_APPROVAL;
            break;
        case roles.STAFF:
        case roles.MANAGER:
            initialStatus = status.PENDING; // Direct verification for staff/manager
            break;
        default:
            return next(new AppError(messages.user.invalidRole, 400));
    }

    // prepare data
    password = bcrypt.hashSync(password, 5)
    const user = new User({
        name,
        email,
        password,
        ID,
        role,
        department,
        gender,
        phone,
        status: initialStatus
    })

    // save to db
    const createdUser = await user.save()
    if (!createdUser) {
        return next(new AppError(messages.user.failToCreate, 500))
    }

    // Only send verification email for STAFF and MANAGER
    if (role !== roles.STUDENT) {
        // generate token
        const token = generateToken({ payload: { email, _id: createdUser._id } });

        // Send verification email
        const emailSubject = 'Complete Your Account Verification';
        const emailHTML = `
            <h2>Welcome!</h2>
            <p>Thank you for registering. To complete your account setup, please verify your email address.</p>
            <p>Click the button below to verify your account:</p>
            <div style="margin: 20px 0;">
                <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}" 
                   style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">
                    Verify Account
                </a>
            </div>
            <p><small>If the button doesn't work, you can copy and paste this link into your browser:</small><br>
            ${req.protocol}://${req.headers.host}/auth/verify/${token}</p>
            <br>
            <p>Best regards,<br>The System Team</p>
        `;

        const isEmailAccepted = await sendEmail({ 
            to: email, 
            subject: emailSubject, 
            html: emailHTML 
        });

        if (!isEmailAccepted) {
            return next(new AppError(messages.sendEmail.failToSend, 500));
        }
    }

    // send response
    return res.status(201).json({
        message: messages.user.createdSuccessfully,
        success: true,
        data: createdUser
    })
}

export const staffSignup = async (req, res, next) => {
    const { name, email, buildingName, password, gender, role } = req.body;

    // Ensure role is either STAFF or MANAGER
    if (![roles.STAFF, roles.MANAGER].includes(role)) {
        return next(new AppError(messages.user.invalidRole, 400));
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError(messages.user.alreadyExist, 409));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create new user
    const newUser = await User.create({
        name,
        email,
        buildingName,
        password: hashedPassword,
        gender,
        role,
        status: status.PENDING
    });

    // Generate verification token
    const token = generateToken({ payload: { email, _id: newUser._id } });

    // Send verification email
    const emailSubject = 'Complete Your Account Verification';
    const emailHTML = `
        <h2>Welcome!</h2>
        <p>Thank you for registering. To complete your account setup, please verify your email address.</p>
        <p>Click the button below to verify your account:</p>
        <div style="margin: 20px 0;">
            <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}" 
               style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">
                Verify Account
            </a>
        </div>
        <p><small>If the button doesn't work, you can copy and paste this link into your browser:</small><br>
        ${req.protocol}://${req.headers.host}/auth/verify/${token}</p>
        <br>
        <p>Best regards,<br>The System Team</p>
    `;

    const isEmailAccepted = await sendEmail({ 
        to: email, 
        subject: emailSubject, 
        html: emailHTML 
    });

    if (!isEmailAccepted) {
        return next(new AppError(messages.sendEmail.failToSend, 500));
    }

    // Send response
    return res.status(201).json({
        message: messages.user.createdSuccessfully,
        success: true,
        data: newUser
    });
}

export const dashboardSignup = async (req, res, next) => {
    let { name, email, password, confirmPassword } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return next(new AppError("برجاء التأكد من تطابق كلمة السر", 400));
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        return next(new AppError("هذا البريد الإلكتروني موجود بالفعل", 409));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: roles.DASHBOARD_ADMIN, // Default role for dashboard signup
        status: status.PENDING // Default status
    });

    // Send verification email
    const token = generateToken({ payload: { email, _id: newUser._id } });
    const emailSubject = 'Complete Your Account Verification';
    const emailHTML = `
        <h2>Welcome!</h2>
        <p>Thank you for registering. To complete your account setup, please verify your email address.</p>
        <p>Click the button below to verify your account:</p>
        <div style="margin: 20px 0;">
            <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}" 
               style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">
                Verify Account
            </a>
        </div>
        <p><small>If the button doesn't work, you can copy and paste this link into your browser:</small><br>
        ${req.protocol}://${req.headers.host}/auth/verify/${token}</p>
        <br>
        <p>Best regards,<br>The System Team</p>
    `;

    const isEmailAccepted = await sendEmail({ 
        to: email, 
        subject: emailSubject, 
        html: emailHTML 
    });

    if (!isEmailAccepted) {
        return next(new AppError(messages.sendEmail.failToSend, 500));
    }

    // Send response
    return res.status(201).json({
        message: 'تم إنشاء المستخدم بنجاح. يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.',
        success: true,
        data: newUser
    });
}

export const dashboardLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        return next(new AppError(" يرجي التأكد من البريد الإلكتروني أو كلمة السر", 400));
    }

    // Check password
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        return next(new AppError(" يرجي التأكد من البريد الإلكتروني أو كلمة السر", 400));
    }

    // Check if user is verified
    if (user.status !== status.VERIFIED) {
        return next(new AppError("يرجي تأكيد حسابك", 403));
    }

    // Generate Token
    const token = generateToken({ 
        payload: { 
            _id: user._id, 
            email,
            role: user.role 
        }
    });

    // Send response
    return res.status(200).json({
        message: "تم تسجيل الدخول بنجاح",
        success: true,
        data: {
            token,
            role: user.role
        }
    });
}

export const verifyAccount = async (req, res, next) => {
    // get data from req
    const { token } = req.params
    const payload = verifyToken({ token })
    
    if (payload.message) {
        return next(new AppError(messages.user.invalidToken, 401))
    }

    const user = await User.findOne({ email: payload.email })
    if (!user) {
        return next(new AppError(messages.user.notFound, 404))
    }

    // Handle verification based on role
    if (user.role === roles.STUDENT) {
        if (user.status !== status.PENDING) {
            return next(new AppError(messages.user.invalidVerification, 400))
        }
    } else {
        // For STAFF and MANAGER
        if (user.status !== status.PENDING) {
            return next(new AppError(messages.user.invalidVerification, 400))
        }
    }

    // Update status to verified
    user.status = status.VERIFIED
    await user.save()

    return res.status(200).json({ 
        message: messages.user.verified, 
        success: true 
    })
}


export const login = async (req, res, next) => {
    // get data from req
    const { email, password } = req.body
    
    // Find user regardless of role, but must be verified
    const user = await User.findOne({ email })
    if (!user) {
        return next(new AppError(messages.user.invalidCredentails, 400))
    }

    // Check user status based on role
    if (user.role === roles.STUDENT) {
        if (user.status === status.WAITING_ADMIN_APPROVAL) {
            return next(new AppError(messages.user.adminApproval, 403))
        }
        if (user.status !== status.VERIFIED) {
            return next(new AppError(messages.user.pleaseVerify, 403))
        }
    } else {
        // For STAFF and MANAGER
        if (user.status !== status.VERIFIED) {
            return next(new AppError(messages.user.pleaseVerify, 403))
        }
    }

    // check password
    const match = bcrypt.compareSync(password, user.password)
    if (!match) {
        return next(new AppError(messages.user.invalidCredentails, 400))
    }

    // generate Token with role included
    const token = generateToken({ 
        payload: { 
            _id: user._id, 
            email,
            role: user.role 
        }
    })

    // send response
    return res.status(200).json({
        message: messages.user.LoginSuccessfully,
        success: true,
        data: {
            token,
            role: user.role
        }
    })
}


export const forgetPassword = async (req, res, next) => {
    //get data from req
    const { email } = req.body
    //check existenc
    const userExist = await User.findOne({ email })
    if (!userExist) {
        return next(new AppError(messages.user.notFound, 404))
    }
    //send OTP
    const otp = crypto.randomBytes(3).toString('hex')
    userExist.resetPasswordToken = otp
    userExist.resetPasswordExpires = Date.now() + 3600000
    //add to db
    await userExist.save()
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
    let { OTP, newPassword } = req.body;

    // Find the user based on the OTP and check if it has not expired
    let user = await User.findOne({ 
        resetPasswordToken: OTP, 
        resetPasswordExpires: { $gt: Date.now() } // Check if the OTP is still valid
    });

    if (!user) {
        return next(new AppError("Invalid or expired OTP", 401));
    }

    // Hash the new password
    user.password = bcrypt.hashSync(newPassword, 5);
    // Clear the OTP and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save();

    return res.status(201).json({ message: 'Password has been reset successfully' });
}

export const approveStudent = async (req, res, next) => {
    const { studentId } = req.params;
    
    const student = await User.findOne({ _id: studentId, status: status.WAITING_ADMIN_APPROVAL });
    
    if (!student) {
        return next(new AppError('Student not found or already processed', 404));
    }

    student.status = status.APPROVED;
    
    // Generate verification token and send email
    const token = generateToken({ payload: { email: student.email, _id: student._id } });
    
    const emailHTML = `
        <h2>Account Approved!</h2>
        <p>Your account registration has been approved. To complete your account setup, please verify your email address.</p>
        <p>Click the button below to verify your account:</p>
        <div style="margin: 20px 0;">
            <a href="${req.protocol}://${req.headers.host}/auth/verify/${token}" 
               style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">
                Verify Account
            </a>
        </div>
        <p><small>If the button doesn't work, you can copy and paste this link into your browser:</small><br>
        ${req.protocol}://${req.headers.host}/auth/verify/${token}</p>
        <br>
        <p>Best regards,<br>The System Team</p>
    `;

    const isEmailSent = await sendEmail({ 
        to: student.email, 
        subject: 'Account Approved - Complete Your Verification', 
        html: emailHTML
    });

    if (!isEmailSent) {
        return next(new AppError(messages.sendEmail.failToSend, 500));
    }

    await student.save();
    
    return res.status(200).json({
        message: 'Student approved successfully',
        success: true
    });
}

export const rejectStudent = async (req, res, next) => {
    const { studentId } = req.params;
    
    const student = await User.findOne({ _id: studentId, status: status.WAITING_ADMIN_APPROVAL });
    
    if (!student) {
        return next(new AppError('Student not found or already processed', 404));
    }

    student.status = status.REJECTED;
    
    const emailHTML = `
        <h2>Account Registration Update</h2>
        <p>We regret to inform you that your account registration has been rejected.</p>
        <p>If you believe this is an error or would like to discuss this further, 
           please contact our support team.</p>
        <br>
        <p>Best regards,<br>The System Team</p>
    `;

    const isEmailSent = await sendEmail({ 
        to: student.email, 
        subject: 'Account Registration Status', 
        html: emailHTML
    });

    if (!isEmailSent) {
        return next(new AppError(messages.sendEmail.failToSend, 500));
    }

    await student.save();
    
    return res.status(200).json({
        message: 'Student rejected successfully',
        success: true
    });
}

export const logout = async (req, res, next) => {
    // Invalidate the token on the client side by removing it from storage
    // Optionally, implement server-side token invalidation logic here

    return res.status(200).json({
        message: 'Logout successful',
        success: true
    });
}

export const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.authUser._id; // Assuming you have user ID from the authenticated user

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        return next(new AppError("برجاء التأكد من تطابق كلمة السر", 400));
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError(messages.user.notFound, 404));
    }

    // Check if the old password is correct
    const isMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!isMatch) {
        return next(new AppError("كلمة السر غير صحيحة", 400));
    }

    // Hash the new password
    user.password = bcrypt.hashSync(newPassword, 5);
    
    // Save the updated user
    await user.save();

    return res.status(200).json({
        message: 'تم تغيير كلمة السر بنجاح',
        success: true
    });
}



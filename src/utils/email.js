import nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yousftamer11@gmail.com',
                pass: 'xdyr ocuj dand wabz'
            }
        })
        
        console.log('Attempting to send email to:', to);
        
        const info = await transporter.sendMail({
            to,
            from: "'<e-commerce-route>'yousftamer11@gmail.com",
            subject,
            html
        })
        
        console.log('Email sent successfully:', {
            messageId: info.messageId,
            response: info.response
        });
        
        return true;
    } catch (error) {
        console.error('Failed to send email:', {
            errorMessage: error.message,
            errorCode: error.code,
            errorResponse: error.response
        });
        return false;
    }
}
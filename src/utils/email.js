import nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yousftamer11@gmail.com',
            pass: 'xdyr ocuj dand wabz'
        }
    })
    
    await transporter.sendMail({
        to,
        from: "'<e-commerce-route>'yousftamer11@gmail.com",
        html
    })
}
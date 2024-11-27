import jwt from 'jsonwebtoken'

export const generateToken = ({ payload, secretKey = process.env.GENERATE_SECRET }) => {
    return jwt.sign(payload, process.env.GENERATE_SECRET)
}

export const verifyToken = ({ token, secretKey = process.env.EMAIL_VERFICATION_SECRET}) => {
  try {
    return jwt.verify(token,process.env.VERFICATION_SECRET)
  } catch (error) {
    //console.log(error);
    return {message:error.message} 
  }
}
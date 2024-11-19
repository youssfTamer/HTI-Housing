import jwt from 'jsonwebtoken'

export const generateToken = ({ payload, secretKey = "secretkey" }) => {
    return jwt.sign(payload, secretKey)
}

export const verifyToken = ({ token, secretKey = 'secretkey' }) => {
  try {
    return jwt.verify(token,secretKey)
  } catch (error) {
    //console.log(error);
    return {message:error.message} 
  }
}
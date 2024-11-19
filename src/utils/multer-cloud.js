import multer,{diskStorage} from 'multer'
import { AppError } from "./appError.js"


export const fileValidation = {
    image: ['image/png', 'image/jpeg'],
    file: ['application/pdf', 'application/msword']
}

export const cloudUploads = ({ allowType = fileValidation.image   } = {}) => {
    const storage = diskStorage({})
    const fileFilter = (req, file, cb) => {
        if (allowType.includes(file.mimetype)) {
            return cb(null, true)
        }

        cb(new AppError("invalid file format", 400), false)
    }
    return multer({ storage, fileFilter })
}
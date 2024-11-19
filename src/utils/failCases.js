import { User } from "../../db/index.js"

export const deleteAccount = async (email)=>{
    await User.deleteOne({email})
}
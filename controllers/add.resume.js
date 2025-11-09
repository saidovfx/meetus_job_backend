import User from "../models/User.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../config/cloudinary.js'
import multer from "multer";
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_imgs',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})

const parser = multer({ storage: storage })

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

export const addresume=async(req,res)=>{
    const userId=req.user.id
    const {resume}=req.file.path
    const  {resumeId}=req.body
    try {
    if (!isValidObjectId(userId) || !userId) {
        return res.status(400).json({ warning: "User id undefined" })
    }  
    if (!resume) {
        return res.status(400).json({ warning: 'All fields are required' })
    }

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ warning: "User not found" })

        if (user.resumeId) {   
        await cloudinary.uploader.destroy(user.resumeId)
        }

        user.resume = resume
        user.resumeId = resumeId
        await user.save()
         res.status(201).json({
            succes: 'User resume updated',
            user
        })
    } catch (error) {
        console.log("Error while updating resume   ", error.message);
        res.status(500).json({ error: 'Server error' })
    }
}


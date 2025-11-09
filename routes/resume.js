import authenticateToken from '../middleware/authenticateToken.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js'
import {addresume} from '../controllers/add.resume.js'
import multer from 'multer';
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile_imgs',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})

const parser = multer({ storage: storage })

import express from "express";
const router=express.Router()
router.use(authenticateToken)
router.post('/add_resume',parser.single('image'),addresume)


export default router
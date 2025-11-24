import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "project_images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "project_videos",
    resource_type: "video",
    format: "mp4",
    transformation: [
      { quality: "auto:low" },
      { bitrate: "500k" },
      { fetch_format: "mp4" },
    ],
  },
});

export const uploadImages = multer({ storage: imageStorage }).array(
  "images",
  10
);
export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("video");

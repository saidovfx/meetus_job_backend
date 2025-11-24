import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const videoStorage = new CloudinaryStorage({
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

export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("video");

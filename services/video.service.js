import cloudinary from "../config/cloudinary.js";

export const checkVideo = async (publicId) => {
  const info = await cloudinary.api.resource(publicId, {
    resource_type: "video",
  });

  if (info.duration > 150) return "Video must be < 2:30";
  if (info.bytes > 40_000_000) return "Compressed video too large";

  return info;
};

export const handleVideoUpdate = async (project, publicId) => {
  const info = await cloudinary.api.resource(publicId, {
    resource_type: "video",
  });

  if (info.duration > 150) {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    throw new Error("Video must be < 2:30");
  }

  if (info.bytes > 30_000_000) {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    throw new Error("Compressed video too large");
  }

  if (project.videoId) {
    await cloudinary.uploader.destroy(project.videoId, {
      resource_type: "video",
    });
  }

  project.videoUrl = info.secure_url;
  project.videoId = info.public_id;

  await project.save();

  return "Video updated successfully";
};

export const deleteCloudVideo = async (publicId) => {
  await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
};
export const deleteProjectVideo = async (project) => {
  if (project.videoId) {
    await cloudinary.uploader.destroy(project.videoId, {
      resource_type: "video",
    });
  }

  project.videoUrl = "";
  project.videoId = "";

  await project.save();

  return "Video removed";
};

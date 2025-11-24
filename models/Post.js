const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "jobusers" },

    images: [
      {
        imageUrl: { type: String },
        imageId: { type: String },
      },
    ],

    videoUrl: { type: String },
    videoId: { type: String },

    title: { type: String, required: true },
    desc: { type: String },

    likes: [
      {
        likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "jobusers" },
      },
    ],

    visibility: {
      type: String,
      enum: ["public", "following", "privite"],
      default: "public",
    },

    views: { type: Number, default: 0 },
    location: { type: String },
    tags: { type: [String], default: [] },

    spamedBy: [
      {
        spamedUserId: { type: String },
        reason: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    savedBy: { type: [String], default: [] },

    linkName: { type: String },
    link: { type: String },
    githubLink: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserPosts", PostSchema);

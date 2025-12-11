import mongoose from "mongoose";

const CollaboratorsSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "jobusers" },
    collaboratorId: { type: mongoose.Schema.Types.ObjectId, ref: "jobusers" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "UserPosts" },
    role: { type: String },
    rejected: { type: Boolean, default: false },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("collaborators", CollaboratorsSchema);

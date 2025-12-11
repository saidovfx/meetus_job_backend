import User from "../models/User.js";
import Post from "../models/Post.js";
import Calloborators from "../models/Calloborators.js";

export const send_post_to_collaborators = async (
  collaborators,
  userId,
  postId
) => {
  try {
    if (collaborators.length <= 0) return;
    ("No collaborators");
    if (!userId) return "Owner Id is not defind";

    const project = await Post.findById(postId);
    if (!project) return "Post not found";
    let collaboratorsData = collaborators;
    if (typeof collaborators === "string") {
      collaboratorsData = JSON.parse(collaborators);
    }

    for (const item of collaboratorsData) {
      const collaborator = new Calloborators({
        ownerId: userId,
        collaboratorId: item.userId,
        postId: project._id,
        role: item.role,
      });

      await collaborator.save();
    }
  } catch (error) {
    console.log("Error ocured while sending post to collaborators", error);
    return "Error ocured while sending post to collaborator";
  }
};

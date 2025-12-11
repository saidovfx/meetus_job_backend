import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Calloborators from "../../models/Calloborators.js";

export const rejectPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rejected, collaboratorId } = req.body;
    const collaborators = await Calloborators.findById(collaboratorId);
    if (!collaborators) {
      return res.status(404).json({ warning: "collaborators posts not found" });
    }

    if (userId !== collaborators.collaboratorId)
      return res.status(401).json({ warning: "it is not your collaborator" });

    collaborators.rejected = rejected;
    await collaborators.save();
    return res.status(200).json({ success: "Rejected successfully" });
  } catch (error) {
    console.log("Error ocured while rejecting post", error);
    return res.status(500).json({ success: "Internal server Error" });
  }
};

export const acceptPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const collaboratorId = req.params.id;
    const postId = req.params.postId;
    const { accepted } = req.body;

    const collaborators = await Calloborators.findById(collaboratorId);
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ warning: " post not found" });
    }

    if (!collaborators) {
      return res.status(404).json({ warning: "collaborators posts not found" });
    }
    if (userId.toString() !== collaborators.collaboratorId.toString()) {
      console.log(collaborators.collaboratorId.toString(), userId.toString());
      return res.status(401).json({ warning: "it is not your collaborator" });
    }

    const collaborator = post?.collaborators.find(
      (user) => user.userId == userId
    );
    console.log(collaborator);

    collaborator.accepted = true;

    collaborators.accepted = accepted;
    await post.save();
    await collaborators.save();
    return res.status(200).json({ success: "Accepted successfully" });
  } catch (error) {
    console.log("Error ocured while accepting post", error);
    return res.status(500).json({ success: "Internal server Error" });
  }
};

export const delete_collaborator = async (rej, res) => {
  try {
    const userId = req.user.id;
    const collaboratorId = req.params.id;
    const postId = req.params.postId;
  } catch (error) {}
};

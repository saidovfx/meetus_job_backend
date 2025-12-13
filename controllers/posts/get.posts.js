import User from "../../models/User.js";
import Calloborators from "../../models/Calloborators.js";
import Post from "../../models/Post.js";

export const get_post = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    if (!postId) return res.staus(400).json({ warning: "Bad request" });
    const post = await Post.findById(postId).populate(
      "userId",
      "profileImgUrl fullname username"
    );
    if (!post) return res.status(404).json({ warning: "Post not found" });

    return res.status(200).json({ success: "Sended post", post });
  } catch (error) {
    console.log("Error ocured while geting one post", error);
    return res.status(500).json({ error: "Server internal error" });
  }
};

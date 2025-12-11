import authenticateToken from "../../middleware/authenticateToken.js";
import {
  acceptPost,
  rejectPost,
} from "../../controllers/posts/collabrators.js";
import express from "express";
const router = express.Router();

router.use(authenticateToken);

router.post("/reject_post", rejectPost);
router.post("/accept_post/:id/:postId", acceptPost);

export default router;

import express from "express";
import { searchEngine } from "../../controllers/posts/search.engine.js";
import authenticateToken from "../../middleware/authenticateToken.js";
const router = express.Router();

router.use(authenticateToken);

router.get("/users", searchEngine);

export default router;

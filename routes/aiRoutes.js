import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from "../controllers/aiController.js";
import { upload } from "../config/multer.js";

const aiRouter = express.Router();

aiRouter.route("/generate-article").post(auth, generateArticle);
aiRouter.route("/generate-blog-title").post(auth, generateBlogTitle);
aiRouter.route("/generate-image").post(auth, generateImage);
aiRouter.route("/remove-image-background").post(auth, upload.single("image"), removeImageBackground);
aiRouter.route("/remove-image-object").post(auth, upload.single("image"), removeImageObject);
aiRouter.route("/resume-review").post(auth, upload.single("resume"), resumeReview);

export default aiRouter;

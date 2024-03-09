import { Router } from "express";
import {
  createVideo,
  deleteVideo,
  getVideoId,
  getVideos,
  updateVideo,
  uploadOptionalVideoMiddleware,
  uploadVideoMiddleware,
} from "../controllers/videos.controller.js";
import { authToken } from "../middlewares/authToken.js";
import { createVideoValidator } from "../validators/videos.validators.js";

const router = Router();

router.post(
  "/createVideo",
  uploadVideoMiddleware,
  createVideoValidator,
  authToken,
  createVideo
);
router.get("/getVideos", getVideos);
router.get("/getVideoId/:id", getVideoId); // Nueva ruta para obtener un video por su ID
router.put(
  "/updateVideo/:id",
  uploadOptionalVideoMiddleware,
  authToken,
  updateVideo
); // Nueva ruta para actualizar un video
router.delete("/deleteVideo/:id", authToken, deleteVideo);

export default router;

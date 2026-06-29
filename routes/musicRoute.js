import express from "express";
// import createMusic from "../controllers/music.controller.js";
import upload from "../services/music.create.js";
import musicController from "../controllers/music.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/music", authMiddleware.authArtist , upload.single("music"), musicController.createMusic);
router.post("/album",authMiddleware.authArtist, musicController.createAlbum);

export default router;

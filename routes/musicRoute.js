import express from "express";
// import createMusic from "../controllers/music.controller.js";
import upload from "../services/music.create.js";
import musicController from "../controllers/music.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/music",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);
router.get("/music", musicController.getAllMusics);
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);
router.get(
  "/album/:albumId",
  authMiddleware.authUser,
  musicController.getAlbumbyId,
);

export default router;

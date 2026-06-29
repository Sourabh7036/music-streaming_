import Music from "../models/musicModel.js";

import uploadFile from "../services/image_kit.js";
import Album from "../models/album.modal.js";

const createMusic = async (req, res) => {
  const { title } = req.body;
  const file = req.file;

  if (!req.file || !title) {
    return res.status(402).json({
      message: "Both are required",
    });
  }

  const resposne = await uploadFile(file.buffer.toString("base64"));

  const music = await Music.create({
    title,
    musicuri: resposne.url,
    artist: req.user.id,
  });
  console.log(music);

  res.status(201).json({
    message: "Music upload successfully",
    music: {
      id: music._id,
      uri: music.musicuri,
      artist: music.artist,
      title: music.title,
    },
  });
};

const createAlbum = async (req, res) => {
  const { title, musics } = req.body;

  const album = await Album.create({
    title,
    musics,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      artist: album.artist,
      title: album.title,
      musics: album.musics,
    },
  });
};

export default { createMusic, createAlbum };

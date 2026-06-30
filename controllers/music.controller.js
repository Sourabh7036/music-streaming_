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

const getAllMusics = async (req, res) => {
  const musics = await Music.find().populate("artist");

  res.status(200).json({
    message: "Music retreive all successfully",
    musics: musics,
  });
};

const getAllAlbums = async (req, res) => {
  const albums = await Album.find().select("-musics").populate("artist");

  res.status(200).json({
    message: "Album get successfully",
    albums,
  });
};

const getAlbumbyId = async (req, res) => {
  const { albumId } = req.params;
  const albums = await Album.findById(albumId)
    .populate("artist")
    .populate("musics");

  res.status(200).json({
    message: "All album musics retreive successfully",
    albums,
  });
};




export default { createMusic, createAlbum, getAllMusics, getAllAlbums , getAlbumbyId};

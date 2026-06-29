import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  musics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Music",
    },
  ],

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Album = mongoose.model("Album", albumSchema);

export default Album;

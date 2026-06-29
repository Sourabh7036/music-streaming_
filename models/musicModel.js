import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  musicuri: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;

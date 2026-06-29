import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_KEY,
});

async function uploadFile(file) {
  const response = await client.files.upload({
    file,
    fileName: "music-" + Date.now(),
    folder: "/spotify/music",
  });

  return response;
}

export default uploadFile;

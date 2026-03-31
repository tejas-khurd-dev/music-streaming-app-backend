const ImageKit = require("@imagekit/nodejs")

const client = new ImageKit({
  privateKey: process.env.IMGKIT_PRIVATE_KEY
});

const uploadFile = async (file) => {
  const result = await client.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: "backendLearning/music_streaming_app"
  })

  return result
}

module.exports = uploadFile
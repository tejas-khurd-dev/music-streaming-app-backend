const musicModel = require("../model/music.model")
const albumModel = require("../model/album.model")
const uploadFile = require("../services/storage.service")


const createMusic = async (req, res) => {

  const title = req.body.title
  const file = req.file
  console.log("req.file =", req.file);

  const result = await uploadFile(file.buffer.toString("base64"))

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id
  })

  res.status(201).json({
    message: "File uploaded successfully",
    music
  })
}



const createAlbum = async (req,res) => {

  const { title, musics } = req.body
  console.log("req.body =", req.body)

  const createAlbum = await albumModel.create({
    title,
    musics,
    artist: req.user.id
  })

  res.status(201).json({
    message: "Album created successfully",
    createAlbum
  })

}

const getAllMusics = async (req,res) => {
  // const musics = await musicModel.find().populate("artist")
  const musics = await musicModel
  .find()
  // .skip(2)
  .limit(10)
  .populate("artist", "userName email")

  res.status(200).json({
    message: "All musics fetched successfully",
    musics
  })
}

const getSingleMusic = async(req,res) => {
  const musicID = req.params.musicID

  const music = await musicModel.findById(musicID).populate("artist", "userName email");

  res.status(200).json({
    message: "Muisc fetched successfully",
    music
  })
}

const getAllAlbums = async (req, res) => {
  try {
    const albums = await albumModel
      .find()
      .skip(1)
      .limit(10)
      .select("title artist")
      .populate("artist", "userName email");
      
      /*
      .select("title artist")

      👉 This is field filtering

      It means:
      ➡️ Only return these fields from each album:

      title
      artist
      */


      /*
      Without populate:
      {
        title: "Album 1",
        artist: "65a9f3c9b12e..."
      }


      With populate:
      {
        title: "Album 1",
        artist: {
          id: 
          userName: "john",
          email: "john@gmail.com"
        }
      }
      */


    res.status(200).json({
      message: "All albums fetched successfully",
      albums
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching albums",
      error: err.message
    });
  }
};


const getAlbumById = async (req, res) => {

  try{
    const albumID = req.params.albumID
  
    const album = await albumModel.findById(albumID)
    .populate({
      path: "musics",
      select: "title artist",
      populate: {
        path: "artist",
        select: "userName email"
      }
    })
    .populate("artist", "userName email")

    res.status(200).json({
      message: "Album fetched successfullt",
      album
    })

  } catch (err){
    res.status(500).json({
      message: "Error fetching album",
      error: err.message
    });
  }

}


module.exports = { createMusic, createAlbum, getAllMusics, getSingleMusic, getAllAlbums, getAlbumById }
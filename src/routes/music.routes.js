const express = require("express")
const musicController = require("../controllers/music.controllers")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth.middleware")

const upload = multer({
  storage: multer.memoryStorage()
})

const router = express.Router()

router.post("/create", authMiddleware.authArtist, upload.single("music"),  musicController.createMusic)

router.post("/album", authMiddleware.authArtist, musicController.createAlbum)

router.get("/all-musics", authMiddleware.authUser,   musicController.getAllMusics)

router.get("/single-music/:musicID", authMiddleware.authUser,   musicController.getSingleMusic)

router.get("/all-albums", authMiddleware.authAll,   musicController.getAllAlbums)

router.get("/album-music/:albumID", authMiddleware.authAll,   musicController.getAlbumById)

module.exports = router
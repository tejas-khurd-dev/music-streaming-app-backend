const jwt = require("jsonwebtoken")


const authArtist = (req, res, next) => {
   const token = req.cookies.token
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorised" })
    }
  
    let decoded;
  
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.role !== "artist") {
        return res.status(403).json({ message: "Normal user don't have access to create music" })
      }

      req.user = decoded

      next();

    } catch (err) {
      return res.status(401).json({ message: `Unauthorised: ${err}` })
    }
}


const authUser = async (req, res, next) => {
  const token = req.cookies.token
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorised" })
    }


    let decoded
    try{
      decoded = jwt.verify(token, process.env.JWT_SECRET)

      if(decoded.role !== "user") {
        return res.status(403).json({ message: "You don't have access" })
      }

      next();

    } catch (err) {
      return res.status(401).json({ message: `Unauthorised: ${err}` })
    }
    
}

const authAll = async (req, res, next) => {
  const token = req.cookies.token
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorised" })
    }


    let decoded
    try{
      decoded = jwt.verify(token, process.env.JWT_SECRET)

      if(decoded.role !== "user" && decoded.role !== "artist") {
        return res.status(403).json({ message: "You don't have access" })
      }

      next();

    } catch (err) {
      return res.status(401).json({ message: `Unauthorised: ${err}` })
    }
    
}

module.exports = { authArtist, authUser, authAll }
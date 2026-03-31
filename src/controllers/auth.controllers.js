const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
  

  // object destructuring
  const {userName, email, password, role = "user"} = req.body
  /*
  const userName = req.body.userName
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role || "user"
  */

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {userName},
      {email}
    ]
  })

  if(isUserAlreadyExist) {
    return res.status(409).json({
      message: "UserName or Email already exists"
    })
  }

  const hash = await bcrypt.hash(password, 10)
  
  const user = await userModel.create({
    userName,
    email,
    password: hash,
    role
  })

  const token = jwt.sign({
    id:user._id,
    role: user.role
  }, process.env.JWT_SECRET)


  res.cookie("token", token)

  res.status(201).json({
    message: "User created sucessfully",
    user: {
      userName: user.userName,
      email: user.email,
      role: user.role
    }
  })
}



const loginUser = async (req, res) => {

  const {userName, email, password} = req.body

  const user = await userModel.findOne({
    $or:[
      { userName },
      { email }
    ]
  })

  if(!user){return res.status(401).json({message:"Invalid Credentials"})}


  const isValidPassword = await bcrypt.compare(password, user.password)


  if(!isValidPassword){return res.status(401).json({message:"Invalid Password"})}

  const token = jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET)

  res.cookie("token", token)


  res.status(200).json({
    message: "login successfully",
    user: {
      userName: user.userName,
      email: user.email,
      role: user.role
    }
  })


}


const logout = (req,res) => {
  res.clearCookie("token")
  res.status(200).json({
    message: "User logged out successfully"
  })
}

module.exports = { registerUser, loginUser, logout }
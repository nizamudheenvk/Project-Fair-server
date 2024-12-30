
const users = require("../models/userModel");
const jwt = require('jsonwebtoken')
// register
exports.registerController = async(req,res)=>{
   console.log("inside RegisterController");
   const {username,email,password}=req.body
   console.log(username,email,password);
   
   try{
     const  exisitngUser = await users.findOne({email})
     if(exisitngUser){
      res.status(406).json("User alredy exist .... please login ")
     }else{
      const newUser = new users({
         username,email,password,github:"",linkedin:"",profilePic:""
      })
      // console.log(newUser);
      await newUser.save()
      res.status(200).json(newUser)
     }
   }catch(err){
     res.status(401).json(err)
   }
}



// login
exports.inginCotroller = async(req,res)=>{
  console.log(("insider redisterController"));
  const {email,password}=req.body
  console.log(email,password);
  try{

    const exisitngUser = await users.findOne({email,password})
    if(exisitngUser){
      const token = jwt.sign({userId:exisitngUser._id}, process.env.JWTPASSWORD)
      res.status(200).json({
        user:exisitngUser,
        token
      })
    }else{
      res.status(404).json("invalid Email/Password")
    }
  }catch(err){
    res.status(401).json(err)
  }
  
  
}


// profile updation

exports.editUserContrtoller = async(req,res)=>{
console.log("inside editProfilePic");
const userId = req.userId
const {username,email,password,github,linkedin,profilePic}=req.body
const updateProfileImgFile = req.file?req.file.filename:profilePic 

try{
  const updateUser = await users.findByIdAndUpdate({_id:userId},{
    username,email,password,github,linkedin,profilePic:updateProfileImgFile
  },{new:true})
await updateUser.save()
res.status(200).json(updateUser)
}catch(err){
  res.status(401).json(err)
}

}
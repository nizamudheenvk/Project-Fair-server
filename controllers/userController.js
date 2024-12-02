// Register
 exports.registerController =(req,res)=>{
    console.log("iside  registerController");
    const {username,email,password}=req.body
    console.log(username,email,password);
    
    res.status(200).json("Request recived!!!")
    

 }
//  login

// profike updation 
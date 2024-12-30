const { query } = require('express');
const projects = require('../models/projectModel')
// request resolving function

// add project
exports.addProjectController = async(req,res)=>{
    console.log("inside addProjectController ");
    const userId=req.userId
    console.log(userId);
    console.log(req.body);
    console.log(req.file);
    const {title,languages,overview,github,website}=req.body
    const projectImage = req.file.filename
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project alredy exist ..... please upload another!!!")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }

    }catch(err){
        res.status(401).json(err)


    }
    
    
    
    

    
}

// get home projects -  guesr user
exports.getHomeProjectController= async(req,res)=>{
    console.log("inside getgetHomeProjectController");
    try{
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)

    }catch(err){
        res.status(401).json(err)
    }
    
}



// get home projects -  autharised  user
exports.getuserProjectController= async(req,res)=>{
    console.log("inside getgetHomeProjectController");
    const userId = req.userId
    try{
        const alluserProjects = await projects.find({userId})
        res.status(200).json(alluserProjects)

    }catch(err){
        res.status(401).json(err)
    }
    
}


// get home projects -  authorised user
exports.getALLProjectController= async(req,res)=>{
    console.log("inside getgetHomeProjectController");
    const searchKey=req.query.search
    const query ={
        languages:{
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
    
}



exports.editprojectController=async(req,res)=>{
    console.log("inside editprojectController");
    const {id} = req.params
    const {title,languages,overview,github,website,projectImage}= req.body 
    const reUploadImageFilename =req.file?req.file.filename:projectImage
    const userId = req.userId
    console.log(id,title,languages,overview,github,website,reUploadImageFilename,userId);
    try{
  const updatedProject = await projects.findByIdAndUpdate({_id:id},{
    title,languages,overview,github,website,projectImage:reUploadImageFilename,userId
  },{new:true})
  await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}



exports.removeProjexctControler= async(req,res)=>{
    console.log("removeProjexctControler");
    const {id} = req.params

    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)

    }catch(err){
        res.status(401).json(err)
    }
    

}
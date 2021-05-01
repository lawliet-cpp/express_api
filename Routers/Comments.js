const express = require("express")
const {Comments } = require("../models")
const router = express.Router()
const authenticate = require("../authenticate")

router.get("/:postID",async(req,res)=>{
    const postID = req.params.postID
    const comments = await  Comments.findAll({
        where:{
            PostId:postID
        }
    })
    res.json(comments)
})

router.get("/create",authenticate,async(req,res)=>{
    const comment = req.body
    try{
        await Comments.create(comment)
        res.json(comment)
    }catch{
        res.json("Canoot create the comment")
    }
})

module.exports = router
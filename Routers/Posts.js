const express = require("express");
const router = express.Router();
const sequelize = require("sequelize")
const Op = sequelize.Op
const { Posts } = require("../models");
const jwt = require("jsonwebtoken")
const config = require("../config.json");

const authenticate = require("../authenticate")


router.get("/", async(req, res) => {
  const posts = await Posts.findAll()
  res.json(posts)
});
router.post("/",authenticate ,async (req, res) => {
  const post = req.body;
  try {
    await Posts.create(post);
    res.json(post);
  } catch {
    res.json("Cannot save data in the database");
  }
});

router.get("/byID/:id",async(req,res)=>{
    const post =await Posts.findAll({
        where:{
            id:req.params.id
        }
    })
    res.json(post)
})

router.get("/search",async(req,res)=>{
    try{
        const post = await Posts.findAll({
            where:{
                title:{
                    [Op.iLike]:`%${req.body.query}%`
                }
            }
        })
        res.json(post)
    }catch{
        res.status(405).json("ERROR")
    }
    
})

router.delete("/:postId",async(req,res)=>{
    try{
        const Post = await Posts.findOne({
            where:{
                id:req.params.postId
            }
        })
        await Post.destroy()
        res.status(200).json("Post deleted")

    }catch{
        res.status(405).json("Cannot Delete the Post")
    }
   

})



module.exports = router;

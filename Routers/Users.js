const express = require("express")
const {Users } = require("../models")
const router = express.Router()
const bcrypt = require("bcrypt")
const sequelize = require("sequelize")
const Op = sequelize.Op
const jwt = require("jsonwebtoken")
const config = require("../config.json")
router.post("/register",async (req,res)=>{
    

    try{
        const {username,email,password} = req.body
        bcrypt.hash(password,10)
        .then(hash=>{
            const user = {
                username:username,
                email:email,
                password:hash,
            }
            Users.create(user)
            return res.status(200).json({
                username:user.username,
            })

        })
        
    }catch{
        res.status(400).json("Cannot Create The User")
    }
    

})


router.post("/login",async(req,res)=>{
    const {username,password} = req.body
    
    const user = await Users.findOne({
        where:{
            username:username,
        }

    })
    if(!user){
        res.status(400).json({
            error:"User not Found"
        })
    }
    bcrypt.compare(password,user.password)
    .then(matched=>{
        if(!matched){
            res.status(400).json({
                error:"Cannot login with the provided credentials"
            })
        }else{
            const user_obj = {
                username:user.username,
                
            }
            const token = jwt.sign(user_obj,config.ACCESS_TOKEN)
            res.status(200).json({"token":token})
        }
    })
})

router.get("/search",async(req,res)=>{
    const user = await Users.findAll({
        where:{
            username:{
              [Op.iLike]:`%${req.body.username}%`
            }
            
        }
    })
    res.json(user)
})

module.exports = router
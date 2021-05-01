const jwt = require("jsonwebtoken")
const config = require("./config.json")
const authenticate  =  (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    if(authHeader == null){
        return res.sendStatus(401)
    }
    const token = authHeader.split(" ")[1]
    if(token === null){
        return res.status(401)
    }
    console.log(token)
    jwt.verify(token,config.ACCESS_TOKEN,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })

}
module.exports = authenticate
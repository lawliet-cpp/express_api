const express = require("express");

const postsRouter = require("./Routers/Posts")

const usersRouter = require("./Routers/Users")
const commentsRouter = require("./Routers/Comments")

const db = require("./models");
const bodyParser = require("body-parser")

const app = express();


app.use(bodyParser.json())
app.use("/users" ,usersRouter)

app.use("/posts",postsRouter)

app.use("/comments",commentsRouter)

db.sequelize.sync().then(() => {
  
  app.listen(3000);
});

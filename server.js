const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const postsRouter = require("./routes/api/posts");
const profileRouter = require("./routes/api/profile");
const usersRouter = require("./routes/api/users");
const path = require("path");
const app = express();
//connect MongoDB
connectDB()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);

//Serve static assets in production
if(process.env.NODE_ENV === "production"){
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*" , (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}
const port = process.env.PORT || 5000;
app.listen(port , console.log(`Server is running on port ${port}`));

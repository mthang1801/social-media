const express = require('express');
const connectDB = require("./config/db");
const authRouter = require("./routes/api/auth");
const postsRouter = require("./routes/api/posts");
const profileRouter = require("./routes/api/profile");
const usersRouter = require("./routes/api/users");
const app = express();
//connect MongoDB
connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);

const port = process.env.PORT || 5000;
app.listen(port , console.log(`Server is running on port ${port}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const users = require("./routes/api/users");
// 引入articles.js
const articles = require("./routes/api/articles");

// DB config
const db = require('./config/config').mongoURI;

// 使用CORS中间件
app.use(cors());

// 使用body-parser的中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 连接MongoDB
mongoose.connect(db, {useNewUrlParser:true}) // {useNewUrlParser:true}解决数据库连接警告
        .then(() => console.log("Mongodb Connected"))
        .catch(err => console.log(err));

// passport初始化
app.use(passport.initialize());

require("./config/passport")(passport); // 将possport传递过去

// 使用routes
app.use("/api/users", users);
app.use("/api/articles", articles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

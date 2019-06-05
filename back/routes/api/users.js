// login and register的后台接口
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // 引入加密工具
const jwt  = require("jsonwebtoken");
const gravatar = require("gravatar");
const keys = require("../../config/config");
const passport = require("passport");

const User = require("../../models/User");

// $route POST api/users/register
// @desc 返回请求的json数据
// @access public
router.post("/register", (req, res) => {
  // console.log(req.body);

  // 查询数据库中是否拥已有邮箱
  User.findOne({email: req.body.email})
      .then((user) => {
        if(user) {
          return res.status(400).json('邮箱已被注册!')
        } else {
          const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          })

          // 密码加密
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;

                newUser.password = hash;

                newUser.save()
                       .then(user => res.json(user))
                       .catch(err => console.log(err))
            });
        });
        }
      })
})

// $route POST api/users/login
// @desc 返回token jwt passport
// @access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({email})
      .then(user => {
        if (!user) {
          return res.status(404).json("用户不存在!")
        }

        // 密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if (isMatch) {
                  // jwt.sign("规则", "加密名", "过期时间", "回调函数")
                  const rule = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    avatar: user.avatar
                  };
                  jwt.sign(rule, keys.secretOrkey, {expiresIn: 3600}, (err, token) => {
                    if (err) throw err;
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    })
                  });
                  // res.json({msg: "success!"})
                } else {
                  return res.status(400).json("密码错误!");
                }
              })
      })
})

// $route GET api/users/current
// @desc return current user
// @access private
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})


module.exports = router;
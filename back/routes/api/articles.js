/**
 * 文章编辑API
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Article");

// $route GET api/articles/test
// @desc 返回请求的json数据
// @access public
// router.get('/test', (req, res) => {
//   res.json({msg: "articles works"});
// })

// $route POST api/articles/add
// @desc 创建信息接口
// @access Private
router.post("/add", passport.authenticate("jwt", {session: false}), (req, res) => {
  const articleFields = {};
  if (req.body.title) articleFields.title = req.body.title;
  if (req.body.category) articleFields.category = req.body.category;
  if (req.body.indexImage) articleFields.indexImage = req.body.indexImage;
  if (req.body.content) articleFields.content = req.body.content;

  new Article(articleFields).save().then(article => {
    res.json(article);
  })
})

// $route GET api/articles
// @desc 获取所有信息接口
// @access Private
router.get('/',(req, res) => {
  Article.find()
         .then(article => {
           if (!article) {
             return res.status(404).json('没有任何内容!')
           }

           res.json(article);
         })
         .catch(err => res.status(404).json(err));
})

// $route GET api/articles/:id
// @desc 获取单个信息接口
// @access Private
router.get('/:id', (req, res) => {
  Article.findOne({id: req.body.id})
         .then(article => {
           if (!article) {
             return res.status(404).json('没有任何内容!')
           }

           res.json(article);
         })
         .catch(err => res.status(404).json(err));
})

// $route POST api/articles/edit/:id
// @desc 编辑信息接口
// @access Private
router.post("/edit", passport.authenticate("jwt", {session: false}), (req, res) => {
  const articleFields = {};

  if (req.body.title) articleFields.title = req.body.title;
  if (req.body.category) articleFields.category = req.body.category;
  if (req.body.indexImage) articleFields.indexImage = req.body.indexImage;
  if (req.body.content) articleFields.content = req.body.content;

  Article.findOneAndUpdate(
    {id:req.body.id},
    {$set: articleFields}
  ).then(article => res.json(article));
})

// $route POST api/articles/delete/:id
// @desc 删除信息接口
// @access Private
router.delete(
  '/delete/:id',
  passport.authenticate("jwt", {session: false}),
  (req, res) => {
    Article.findOneAndDelete({ id: req.params.id }, function(err, data) {
      if(err) res.send(err)
      else res.send('ok')
    })
  }
)


/**
 * 评论API
 */

// $router POST api/articles/comment
// @desc 评论新建接口
// @access Private
router.post('/comment', (req, res) => {
  let contentId = req.body.contentid || '';
  let commentData = {
    useravatar: req.body.useravatar,
    username: req.body.username,
    commentTime: new Date(),
    content: req.body.content
  };
  // 文章查询
  if (req.body.content) {
    Article.findOne({id: contentId})
         .then((article) => {
          article.comments.push(commentData);
          return article.save();
         })
         .then(newArticle => {
          res.json('评论成功!')
         })
  } else {
    res.json('评论不能为空！')
  }
})

// $router GET api/articles/comment/get
// @desc 评论获取接口
// @access Private
router.get('/comment/get', (req, res) => {
  let contentId = req.query.contentid || '';
  Article.findOne({id: contentId})
         .then((article) => {
           res.json(article.comments)
         })
})

module.exports = router;
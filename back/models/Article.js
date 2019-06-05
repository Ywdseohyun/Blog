/**
 * 创建数据库模型(model)
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let counter = 1;
let CountedId = {type: Number, default: () => counter++};
// 创建Schema（模式对象）
const ArticleSchema = new Schema({
  id: CountedId,
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  indexImage: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    default: []
  }
})

// 创建Model
module.exports = Article = mongoose.model("articles", ArticleSchema);

Article.find({ id: { $gt: 0 } }).sort({ id: -1 })
       .then(([first, ...others]) => {
        if (first)
            counter = first.id + 1;
    });
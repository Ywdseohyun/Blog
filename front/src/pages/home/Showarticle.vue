<template>
  <div class="body_color">
    <home-header></home-header>
    <div class="margin_top">
      <el-card class="showBlog">
        <div slot="header" class="clearfix">
          <span class="artcle_title" v-text="article.title"></span>
        </div>
        <section class="text item" v-html="compiledMarkdown"></section>
      </el-card>
      <el-card class="showBlog">
        <div slot="header" class="clearfix">
          <span>评论区</span>
        </div>
        <div class="clear">
          <el-input
            v-model="content"
            type="textarea"
            resize="none"
            :autosize="{ minRows: 6, maxRows: 8}"
            placeholder="请输入评论"
            >
          </el-input>
          <el-button type="info" round plain @click="isLogin">{{user.name?'发表':'登录'}}</el-button>
        </div>
        <div class="comment" v-for="(item, index) in comments" :key="index">
          <span class="user_avatar">
            <img :src="item.useravatar">
          </span>
          <span class="user_name">{{item.username}}</span>
          <span class="time">{{item.commentTime.slice(0,10)}}</span>
          <span class="desc">{{item.content}}</span>
        </div>
      </el-card>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import marked from 'marked'
// import highlight from 'highlight'
import HomeHeader from './components/Header'
import HomeFooter from './components/Footer'

export default {
  name: 'ShowArticle',
  components: {
    HomeHeader,
    HomeFooter
  },
  data () {
    return {
      article: {},
      content: '',
      comments: []
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.article.content, { sanitize: true })
    },
    user () {
      return this.$store.getters.user;
    }
  },
  created () {
    //  this.article = 
    this.$route.params.article && localStorage.setItem('Article', JSON.stringify(this.$route.params.article));
    this.article = JSON.parse(localStorage.getItem('Article'))
    this.getCommnets()
    this.markdown()
  },
  methods: {
    markdown () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        // highlight: highlight,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
    },
    isLogin () { 
      if (this.user.name === '' || this.user.name === undefined) {
        this.$router.push('/login')
      } else {
        let data = {
          contentid: this.article.id,
          useravatar: this.user.avatar,
          username: this.user.name,
          content: this.content
        }
        let context = this
        this.$axios.post('api/articles/comment', data)
                   .then(res => {
                     this.$message({
                         message: res.data,
                         type: "success"
                       })
                      context.getCommnets()
                   })
      }
    },
    getCommnets () {
      // let dataId = {contentid: this.article.id}
      // let contentid = this.article.id
      // console.log(contentid)
      this.$axios.get(`api/articles/comment/get?contentid=${this.article.id}`)
                 .then(res => {
                   // console.log(res)
                    this.comments = res.data
                 })
    }
  }
}
</script>

<style lang="stylus" scoped>
.body_color {
  background-color: #ddd;
}
.margin_top {
  margin-top: 10px;
}
.artcle_title {
  font-size: 35px;
}
.showBlog {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 25px;
  box-shadow: 0px 5px 10px #777;
}
.text >>> p {
  line-height: 25px;
  text-indent:2em;
}
.text >>> h2 {
  line-height: 40px;
  font-weight: bold
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clear {
  overflow: hidden;
}
.el-button {
  float: right;
  margin: 10px 0;
}
.comment {
  margin: 15px 0;
  border-bottom:1px solid #B9B9C8
}
.user_name {
  margin-left: 5px;
}
.user_avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.time {
  float: right;
}
.desc {
  margin-top: 18px;
  font-size: 17px;
  display: block;
}
</style>
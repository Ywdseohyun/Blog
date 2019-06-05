<template>
  <div class="addArticle">
    <el-form ref="articleForm" :model="articleData" :rules="formRules">
      <el-form-item prop="title">
        <el-input
        v-model="articleData.title"
        placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item prop="category">
        <el-input
        v-model="articleData.category"
        placeholder="文章分类"></el-input>
      </el-form-item>
      <el-form-item prop="indexImage">
        <el-input
        v-model="articleData.indexImage"
        placeholder="图片"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <mavon-editor
          class="markdown_edit"
          placeholder="文章内容"
          v-model="articleData.content"/>
      </el-form-item>
      <el-form-item>
        <el-button
        class="btn_right"
        type="primary"
        @click="publish('articleForm')" plain>提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Addarticle',
  data () {
    return {
      action: 'add',
      articleData: {
        title: '',
        category: '',
        indexImage: '',
        content: ''
      },
      formRules: {
        title: [
          {required: true, message: '标题不能为空', trigger: 'blur'},
          {min: 2, max: 30, message: '长度在2到30个字符之间', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '分类不能为空', trigger: 'blur'},
          {min: 2, max: 30, message: '长度在2到20个字符之间', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '内容不能为空',trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.$route.params.article?this.articleData = this.$route.params.article:this.articleData ={}
    if (this.$route.params.article) {
      this.articleData = this.$route.params.article
      this.action = 'edit'
    } else {
      this.articleData ={}
    }
  },
  methods: {
    publish (articleForm) {
      let url = 'api/articles/add'
      this.action === 'add'?url = 'api/articles/add':url = 'api/articles/edit' 
      this.$refs[articleForm].validate(valid => {
        if (valid) {
          this.$axios.post(url, this.articleData)
                     .then(res => {
                       this.$message({
                         message: "提交成功!",
                         type: "success"
                       })
                     })
          this.$router.push('/articlelist');
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.addArticle {
  width: 100%;
  height: 753px;
}
.el-form {
  padding: 25px 40px;
}
.btn_right {
  float: right;
}
.el-input {
  margin-bottom: 10px;
}
.textarea {
  margin-bottom: 5px;
}
.markdown_edit {
  min-height: 300px;
  max-height: 350px;
}
</style>
<template>
  <div class="margin_top">
    <el-card
      class="showArticle"
      v-for="(item, key) in aticleData"
      :key="key"
      >
      <div slot="header" class="clearfix pointer" @click="showArticle(item)">
        <span class="artcle_title">{{item.title}}</span>
      </div>
      <span class="text item">{{item.date.slice(0,10)}}</span>
      <img class="img_index" :src=item.indexImage>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HomeContent',
  data () {
    return {
      aticleData: []
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      this.$axios
        .get("/api/articles")
        .then(res => {
          this.aticleData = res.data;
        })
        .catch(err => console.log(err));
    },
    showArticle (item) {
      // localStorage.setItem('Article', item)
      this.$router.push({name: 'ShowArticle', params: {article: item}}) //, params: {id: id}
    }
  }
}
</script>

<style lang="stylus" scoped>
.margin_top {
  margin-top: 10px;
}
.artcle_title {
  font-size: 35px;
}
.showArticle {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 25px;
  box-shadow: 0px 5px 10px #777;
}
.pointer {
  cursor: pointer;
}
.img_index {
  width: 100%;
  display: inline;
}
.text {
  font-size: 18px;
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
</style>
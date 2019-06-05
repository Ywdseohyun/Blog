<template>
  <div class="body_color">
    <home-header></home-header>
    <div class="margin_top">
      <el-card class="info">
        <div slot="header" class="clearfix user_avatar">
          <img :src="user.avatar">
        </div>
        <div class="show">
          <div class="user-item">
            昵称：<el-input v-model="user.name"></el-input>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </div>
          <span class="showInfo">email：{{user.email}}</span>
        </div>
        <div class="out_btn">
          <el-button type="info" plain round @click="logout">Sign Out</el-button>
        </div>
      </el-card>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeHeader from './components/Header'
import HomeFooter from './components/Footer'

export default {
  name: 'Userinfo',
  components: {
    HomeHeader,
    HomeFooter
  },
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {
    logout () {
      // 清除token
      localStorage.removeItem('Token');
      // 设置vuex store
      this.$store.dispatch('clearCurrentState');
      // 跳转
      this.$router.push('/');
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
.info {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 25px;
  box-shadow: 0px 5px 10px #777;
}
.user_avatar img {
  width: 150px;
  border-radius: 50%;
  margin-left: 400px;
}
.show {
  margin-left: 350px;
}
.showInfo{
  display: block;
  font-size: 30px;
  line-height: 50px;
}
.out_btn {
  margin-top: 40px;
  margin-bottom: 130px;
  margin-left: 430px;
}
.el-input {
  width: 250px;
  font-size: 25px;
}
</style>
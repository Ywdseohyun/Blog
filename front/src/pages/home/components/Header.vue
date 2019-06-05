<template>
  <header class="header">
    <el-row>
      <el-col :span="8" class="logo">Y'Blog
      </el-col>
      <el-col :span="13">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#333"
          text-color="#aaa"
          active-text-color="#fff">
          <el-menu-item index="1">Home</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="3">
        <button :type="changeColor" class="login" @click="loginStatus">{{user.name?user.name:'Sign In'}}</button>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      activeIndex: '1',
      // loginText: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      this.$router.push('/')
    },
    loginStatus: function () {
      if (this.user.name === '' || this.user.name === undefined) {
        this.$router.push('/login')
      } else if (this.user.isAdmin === true) {
        this.$router.push('/back')
      } else {
        this.$router.push('/userinfo')
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user;
    },
    changeColor () {
      if (this.user.name) {
        return 'success'
      } else {
        return 'primary'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #333;
}
.el-row {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
}
.logo {
  line-height: 60px;
  font-size: 45px;
  color: #fff;
}
.login {
  width: 100%;
  height: 60px;
  line-height: 60px;
  float: right;
  text-align: center;
  background-color: #3B99FC;
  font-size: 25px;
  font-style:italic;
  color: #fff;
  cursor: pointer;
}
.el-menu-item {
  font-size: 25px;
  font-style:italic;
}

</style>
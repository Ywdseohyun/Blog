<template>
  <header class="head-nav">
    <el-row>
      <router-link to="/">
        <el-col :span="6" class="title">
        Blog
        </el-col>
      </router-link>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar">
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  name: 'BackHeader',
  computed: {
    user () {
      return this.$store.getters.user;
    }
  },
  methods: {
    setDialogInfo (cmdItem) {
      // console.log(cmdItem);
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList () {
      this.$router.push('/backinfo')
    },
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
  .head-nav {
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1
    min-width: 600px;
    padding: 5px;
    background-color: #333;
    color: #fff;
  }
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    vertical-align: middle;
    font-size: 50px;
    color: #fff;
    letter-spacing: 3px;
  }
  .user {
    line-height: 60px;
    text-align: right;
    float: right;
    padding-right: 10px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename {
    font-size: 12px;
  }
  .avatarname {
    color: #409eff;
    font-weight: bolder;
  }
  .username {
    cursor: pointer;
    margin-right: 5px;
  }
  .el-dropdown {
    color: #fff;
  }
</style>
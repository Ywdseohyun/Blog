<template>
 <div class="leftnav">
    <el-row class="nav_left">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#545c64">
          <router-link to='/backhome'>
            <el-menu-item index="0">
              <span slot="title">后台首页</span>
            </el-menu-item>
          </router-link>
          <template v-for="item of items">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="(citem, cindex) in item.children" :to="citem.path" :key="cindex">
                <el-menu-item :index="citem.path">
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
 </div>
</template>

<script>
export default {
  name: 'Leftnav',
  data () {
    return {
      items: [
        {
          name: '博文管理',
          path: 'edit',
          children: [{path: "Articlelist", name: "文章编辑"}]
        },
        {
          name: '信息管理',
          path: 'info',
          children: [{path: "Backinfo", name: "个人信息"}]
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav_left {
  position: fixed;
  top: 70px;
  left: 0;
  min-height: 100%;
  background-color: #333;
  z-index: 99;
}
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu-collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

</style>
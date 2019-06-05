<template>
  <div class="index">
    <back-header></back-header>
    <back-left></back-left>
    <div class="rigthContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BackHeader from './Header'
import BackLeft from './Leftnav'
export default {
  name: 'Back',
  components: {
    BackHeader,
    BackLeft
  }
}
</script>

<style lang="stylus" scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rigthContainer {
  position: relative;
  top: 60px;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
<template>
  <div class="channel_install">
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      ref="menus"
      :unique-opened=true
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>渠道列表</span>
        </template>
          <el-menu-item index="1-1">渠道设置</el-menu-item>
          <el-menu-item index="1-2">商品设置</el-menu-item>
          <el-menu-item index="1-3">添加</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">商户列表</span>
        </template>
        <el-menu-item index="2-1">添加</el-menu-item>
        <el-menu-item index="2-2">授信</el-menu-item>
        <el-menu-item index="2-3">商品设置</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">商品组</span>
        </template>
        <el-menu-item index="3-1">添加</el-menu-item>
      </el-submenu>
    </el-menu>
</div>
</template>

<script>
export default {
  name: 'channel_install',
  data() {
      return {
        open: true
      }
    },
  methods: {
    handleOpen(key, keyPath){
      console.log(key, keyPath)
      console.log(this.open)
    },
    handleClose(key, keyPath){
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.el-menu{
  width: 220px;
  min-height: 100%;
  overflow-x: hidden;
  background-color: #545c64 !important;
  color: #fff;
  box-shadow: 1px 0 2px 0 rgba(0, 0, 0, .05);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  .el-submenu li {
      padding-left: 50px!important;
      text-align: left;
  }
  .el-submenu {
    display: block;
    width: 100%;
    line-height: 45px;
    margin: 0;
  }
  .el-menu-item {
      color: rgba(255,255,255,.7)!important;
      display: block;
      width: 100%;
      line-height: 45px;
      margin: 0;
      i {
          color: rgba(255,255,255,.7)!important;
          float: left;
          line-height: 56px;
      }
      span {
          float: left;
          line-height: 56px;
      }
  }
  .el-submenu__title i {
      color: rgba(255,255,255,.7)!important;
      float: left;
      line-height: 56px;
  }
  .el-submenu__title span {
      float: left;
      line-height: 56px;
  }
  .el-menu-item,/deep/.el-submenu__title {
          color: rgba(255,255,255,.7)!important;
      }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

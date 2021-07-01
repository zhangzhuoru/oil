<template>
  <div class="channel_install">
     <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      ref="menus"
      :unique-opened=true
      @select="selectItems"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>渠道列表</span>
        </template>
          <el-menu-item index="1-1">渠道设置</el-menu-item>
          <el-menu-item index="1-2">商品设置</el-menu-item>
          <el-menu-item index="1-3">商品添加</el-menu-item>
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
	<div class="rightbox">
    <Chanelist v-if="open=='1'"></Chanelist>
    <Channeinstall v-if="open=='1-1'"></Channeinstall>
    <Goodslist v-if="open=='1-2'"></Goodslist>
    <Goodsinstall v-if="open=='1-3'"></Goodsinstall>
    <Businesslist v-if="open=='2'"></Businesslist>

	</div>
</div>
</template>


<script>
import Chanelist from '../components/channellist.vue'
import Goodslist from '../components/goodslist.vue'
import Businesslist from '../components/businesslist.vue'
import Channeinstall from '../components/channeinstall.vue'
import Goodsinstall from '../components/goodsinstall.vue'
export default {
  name: 'channel_install',
  data() {
      return {
        open: ''
      }
    },
  methods: {
    handleOpen(key, keyPath){
      // console.log(key, keyPath)
      this.open = key
    },
    handleClose(key, keyPath){
      this.open = key
      // console.log(key, keyPath)
    },
    selectItems(key, keyPath){
      this.open = key
      console.log(key, keyPath,this.open)
    }
  },
  components: {
      Chanelist,
      Channeinstall,
      Businesslist,
      Goodslist,
      Goodsinstall
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .channel_install{
    display: flex;
    overflow:hidden
  }
.el-menu{
  width: 220px;
  flex: 220px;
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
.rightbox{
  margin-left: 220px;
	margin-top: 90px;
  width: calc(100% - 220px);
  background-color: #f2f2f2;
  color: #666;
  min-height: 100%;
  overflow-x: hidden;
  position: fixed;
}
</style>

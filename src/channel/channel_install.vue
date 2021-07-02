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
        <el-menu-item index="2-1">商户添加</el-menu-item>
        <el-menu-item index="2-2">商户授信</el-menu-item>
        <el-menu-item index="2-3">商品设置</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">商品组</span>
        </template>
        <el-menu-item index="3-1">商品组添加</el-menu-item>
      </el-submenu>
    </el-menu>
  <div class="listbat">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click = 'changetab'>
      <el-tab-pane
        :key="0"
        label="首页"
        :closable=false
        :editable=false
      ></el-tab-pane>
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
	<div class="rightbox">

    <Home v-if="open=='0'"></Home>
    <Chanelist v-if="open=='1'"></Chanelist>
    <Channeinstall v-if="open=='1-1'"></Channeinstall>
    <Goodslist v-if="open=='1-2'"></Goodslist>
    <Goodsinstall v-if="open=='1-3'"></Goodsinstall>
    <Businesslist v-if="open=='2'"></Businesslist>
    <Businessinstall v-if="open=='2-1'"></Businessinstall>
    <Creditinstall v-if="open=='2-2'"></Creditinstall>
    <Downgoodslist v-if="open=='2-3'"></Downgoodslist>
    <Goodsgroup v-if="open=='3'"></Goodsgroup>
    <Goodsgroupinstall v-if="open=='3-1'"></Goodsgroupinstall>


	</div>
</div>
</template>


<script>
import Home from '../components/home.vue'
import Chanelist from '../components/channellist.vue'
import Goodslist from '../components/goodslist.vue'
import Businesslist from '../components/businesslist.vue'
import Businessinstall from '../components/businessinstall.vue'
import Channeinstall from '../components/channeinstall.vue'
import Goodsinstall from '../components/goodsinstall.vue'
import Creditinstall from '../components/creditinstall.vue'
import Downgoodslist from '../components/downgoodslist.vue'
import Goodsgroup from '../components/goodsgroup.vue'
import Goodsgroupinstall from '../components/goodsgroupinstall.vue'
export default {
  name: 'channel_install',
  data() {
      return {
        open: '0',
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 1,
        target:{
          '0':'首页',
          '1':'渠道列表',
          '1-1':'渠道设置',
          '1-2':'商品设置',
          '1-3':'商品添加',
          '2':'商户列表',
          '2-1':'商户添加',
          '2-2':'商户授信',
          '2-3':'商品设置',
          '3':'商品组',
          '3-1':'商品组添加'
        },
        targetn:'首页',
        addis:true
      }
    },
  methods: {
    handleOpen(key, keyPath){
      // console.log(key, keyPath)
      this.open = key
      this.targetn = this.target[this.open]
      this.addTab(this.targetn)
    },
    handleClose(key, keyPath){
      this.open = key
      this.targetn = this.target[this.open]
      this.addTab(this.targetn)
      // console.log(key, keyPath)
    },
    selectItems(key, keyPath){
      this.open = key
      this.targetn = this.target[this.open]
      this.addTab(this.targetn)
    },
    addTab(targetName) {
      // if(targetName==this.targetn) return
      let newTabName = ++this.tabIndex + '';
      this.addis = true
      for(let i = 0; i<this.editableTabs.length;i++){

        if(targetName ==this.editableTabs[i].title){
          this.editableTabsValue = this.editableTabs[i].name
          this.addis= false
        }
      }
      if(this.addis){
        this.editableTabs.push({
          title: targetName,
          name: newTabName
        });
        this.editableTabsValue = newTabName;
      }

    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    changetab(targetName) {
      console.log(targetName,1,this.target)
      for(var key in this.target){
        if(this.target[key]==targetName.label){
          this.open = key
        }
      }
    //   if (activeName === targetName) {
    //     tabs.forEach((tab, index) => {
    //       if (tab.name === targetName) {
    //         let nextTab = tabs[index + 1] || tabs[index - 1];
    //         if (nextTab) {
    //           activeName = nextTab.name;
    //         }
    //       }
    //     });
    //   }


    }
  },
  components: {
    Home,
    Chanelist,
    Channeinstall,
    Businesslist,
    Goodslist,
    Goodsinstall,
    Businessinstall,
    Creditinstall,
    Downgoodslist,
    Goodsgroup,
    Goodsgroupinstall
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .channel_install{
    display: flex;
    overflow:hidden
  }
  //列表按钮
  .listbat{
    width: 100%;
    margin-left: 220px;
    box-sizing: border-box;
    height: 90px;
    padding-top: 50px;

  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable:first-child/deep/ .el-icon-close, .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover .el-icon-close{
      width: 0;
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

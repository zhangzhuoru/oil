<template>
  <div class="about">
    <!-- :collapse="isCollapse" -->
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
          <span>上游渠道列表</span>
        </template>
          <el-menu-item index="1-1">上游渠道设置</el-menu-item>
          <!-- <el-menu-item index="1-2">上游商品设置</el-menu-item>
          <el-menu-item index="1-3">上游商品添加</el-menu-item> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">下游商户列表</span>
        </template>
        <!-- <el-menu-item index="2-1">下游商户添加</el-menu-item>
        <el-menu-item index="2-2">下游商户授信</el-menu-item>
        <el-menu-item index="2-3">下游商品设置</el-menu-item> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">商品组</span>
        </template>
        <el-menu-item index="3-1">商品组添加</el-menu-item>
      </el-submenu>
    </el-menu>
  <div class="listhear">
    <div class="hearlbox">
      <!-- <i class="el-icon-set-up" @click="openlist"></i> -->
      <i class="el-icon-full-screen"></i>
    </div>
    <div class="hearrbox">
       <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{usename}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">修改密码</el-dropdown-item>
          <el-dropdown-item command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
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
    <Chanelist v-if="open=='1'" @justchange="justchange" @justmsg="justmsg" @justchanger="justchanger" @justqdid="justqdid"></Chanelist>
    <Channeinstall v-if="open=='1-1'" :qdmsg="qdmsg" @justchange="justchange"></Channeinstall>
    <Goodslist v-if="open=='1-2'" @justchange="justchange" @justsysp = 'justsysp' :qdid="qdid"></Goodslist>
    <Goodsinstall v-if="open=='1-3'" :shengfen="shengfen" :qdid="qdid" :syspmsg="syspmsg" @justchange="justchange" ></Goodsinstall>
    <Businesslist v-if="open=='2'" @justchange="justchange" @justsrmsg="justsrmsg"></Businesslist>
    <Businessinstall v-if="open=='2-1'" :srmsg="srmsg" @justchange="justchange"></Businessinstall>
    <Creditinstall v-if="open=='2-2'" :srmsg="srmsg" @justchange="justchange"></Creditinstall>
    <Downgoodslist v-if="open=='2-3'" :srmsg="srmsg" @justchange="justchange" :shengfen="shengfen"></Downgoodslist>
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
  name: 'about',
  data() {
      return {
        qdmsg:{
          balance: "",
          balance_url: "",
          callback_url: "",
          created_at: "",
          daily_limit: 0,
          order_search_url: "",
          order_url: "",
          passageway_no: "",
          platform_balance: "",
          supplier_id: "",
          supplier_name: "",
          updated_at: "",
          voucher_account: "",
          voucher_pwd: "",
          voucher_secret: ""
        },
        syspmsg:{
          amount: "",
          created_at: "",
          discount: "",
          good_code: "",
          pay_amount: "",
          province: "",
          supplier_good_id: "",
          supplier_id: "",
          supplier_name: "",
          type: 2,
          updated_at: ""
        },
        usename:'666',
        open: '0',
        editableTabsValue: '1',
        editableTabs: [],
        tabIndex: 1,
        shengfen:[],
        // isCollapse:true,
        target:{
          '0':'首页',
          '1':'上游渠道列表',
          '1-1':'上游渠道设置',
          '1-2':'上游商品设置',
          '1-3':'上游商品添加',
          '2':'下游商户列表',
          '2-1':'下游商户添加',
          '2-2':'下游商户授信',
          '2-3':'下游商品设置',
          '3':'商品组',
          '3-1':'商品组添加'
        },
        targetn:'首页',
        addis:true,
        lastopen:'0',
        qdid:'',
        srmsg:''
      }
    },
    watch:{
      open: function(newv,oldv){
        console.log(newv,oldv)
        this.lastopen=oldv
      }
    },
    created(){
      this.getshengfen()
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
    //点击子菜单
    selectItems(key, keyPath){
      this.open = key
      this.targetn = this.target[this.open]
      this.addTab(this.targetn)
      console.log(1,key)
      if(key == '1-1'){
        this.qdmsg={
          balance: "",
          balance_url: "",
          callback_url: "",
          created_at: "",
          daily_limit: 0,
          order_search_url: "",
          order_url: "",
          passageway_no: "",
          platform_balance: "",
          supplier_id: "",
          supplier_name: "",
          updated_at: "",
          voucher_account: "",
          voucher_pwd: "",
          voucher_secret: ""
        }
      }

    },
    //添加列表item
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
    //关闭列表item
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
      console.log(this.editableTabs.length,this.editableTabsValue)
      for(let i = 0; i<this.editableTabs.length;i++){

        if(this.editableTabsValue ==this.editableTabs[i].name){
          for(var key in this.target){
            if(this.target[key]==this.editableTabs[i].title){
              this.open = key
            }
          }
        }
      }
      if(this.editableTabs.length==0){
        this.open = 0
      }
    },
    //点击激活列表item
    changetab(targetName) {
      // console.log(targetName,1,this.target)
      for(var key in this.target){
        if(this.target[key]==targetName.label){
          this.open = key
        }
      }
    },
    openlist(){
      this.isCollapse = !this.isCollapse
    },
    handleCommand(command) {
      console.log(command)
      if(command == 'b'){
        window.sessionStorage.clear();
        this.$router.push('/login')
      }
      this.$message.success('退出登录，请重新登录');
    },
    //子传父
    justchange(msg){
       console.log(msg)
       this.open = msg
       this.targetn = this.target[this.open]
       this.addTab(this.targetn)
    },
    justchanger(msg){
      console.log('msg',msg)
       this.selectItems(msg)
    },
    //子传父
    justmsg(msg){
       console.log(msg)
       this.qdmsg=msg
    },
    //子传父1-2
    justsysp(msg){
       console.log(msg)
       this.syspmsg=msg
    },
    //子传父1
    justqdid(msg){
       console.log(msg)
       this.qdid=msg
    },
    //子传父2
    justsrmsg(msg){
       console.log(msg)
       this.srmsg=msg
    },
    async getshengfen(){
      // console.log(key, keyPath)
     try {
       //获取省份
       let res = await this.$http.get("provinces")
       this.shengfen = res
       // console.log(res)
      } catch (err) {
              console.log(err)
              alert('请求出错！')
            }
        // if(this.shengfen.)
      if(this.shengfen.status === 201||this.shengfen.status === 200){
        this.shengfen=this.shengfen.data.data
        console.log(this.shengfen)
        // this.total=this.shengfen.data.data.last_page
        // this.$message.success('请求成功！')
      }else{
        // console.log(this.shengfen.status=='201')
        this.$message.error('请求失败！')
      }
      // console.log('shengfen',this.shengfen.data.data)

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
  .about{
    display: flex;
    overflow:hidden;
  }
  //列表按钮
  .listbat{
    width: 100%;
    left: 0;
    padding-left: 220px;
    box-sizing: border-box;
    height: 40px;
    position: absolute;
    top: 50px;
    z-index: 1;
  }
  .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable:first-child/deep/ .el-icon-close, .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable:hover .el-icon-close{
      width: 0;
  }
  //列表hear
  .listhear{
    width: 100%;
    margin-left: 220px;
    box-sizing: border-box;
    height: 50px;
    display: flex;
    justify-content: space-between;
    .hearlbox{
      height: 100%;
      font-size: 16px;
      line-height: 50px;
      padding: 0 10px;
      color: #333;
      cursor: pointer;
      i{
        margin: 0 20px;
        color: #333;
      }
    }
    .hearrbox{
      .el-dropdown-link {
        cursor: pointer;
        line-height: 50px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 220px;
      flex: 220px;
    }
	//左边列表css
.el-menu{
  // width: 220px;
  // flex: 220px;
  min-height: 100%;
  overflow-x: hidden;
  background-color: #545c64 !important;
  color: #fff;
  box-shadow: 1px 0 2px 0 rgba(0, 0, 0, .05);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
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
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background-color: #f2f2f2;
  color: #666;
  min-height: 100%;
  overflow-x: hidden;
  position: fixed;
}
</style>

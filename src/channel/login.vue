<template>
  <div class="login">
    <div class="mianbox">
      <div class="mboxt">
          加油券管理系统
      </div>
      <div class="mboxt2">
          仅内部使用
      </div>
      <div class="lnane">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-user"
          v-model="pass.username">
        </el-input>
      </div>
      <div class="lpass">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-unlock"
          v-model="pass.password">
        </el-input>
      </div>
      <div class="loginbtn">
        <el-button type="primary" round @click='login'>登录</el-button>
      </div>
    </div>

  </div>
</template>


<script>

export default {
  name: 'login',
  data() {
      return {
        pass:{
          username: 'admin',
          password: 'jyq123456',
          grant_type:'password',
          client_secret:'LhBUQAJf5UH0qu3MyCZ10chvrKr8qJEpvfupOOPK',
          client_id:'1'
        },
        result:''
      }
    },
  methods: {
    async login(){
      // console.log(key, keyPath)
     try {
       let res = await this.$http.post("voucherAdminLogin", this.pass)
       this.result = res
      } catch (err) {
              console.log(err)
              alert('请求出错！')
            }
        // if(this.result.)
      if(this.result.status === 201||this.result.status === 200){
        console.log(this.result.status === 201)

        this.$message.success('登录成功！')
        
        window.sessionStorage.setItem('token',this.result.data.token_type+' '+this.result.data.access_token)
        this.$router.push('/about')
      }else{
        console.log(this.result.status=='201')
        this.$message.error('登录失败！')
      }
      console.log('result',this.result)

    },
    handleClose(key, keyPath){
      this.open = key
      this.targetn = this.target[this.open]
      this.addTab(this.targetn)
      // console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login{
    height: 100%;
    position: relative;
    background-color: #f2f2f2;
  }
  .mianbox{
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%,0);
  }
  .mboxt{
    margin-bottom: 10px;
    font-weight: 300;
    font-size: 30px;
    color: #000;
  }
  .mboxt2{
    font-weight: 300;
    color: #999;
    line-height: 24px;
    font: 14px Helvetica Neue,Helvetica,PingFang SC,Tahoma,Arial,sans-serif;
  }
  .lnane{
    width: 335px;
    margin-top: 40px;
    margin-bottom: 15px;
  }
  .lpass{
    width: 335px;
    margin-bottom: 15px;
  }
  .loginbtn button{
    width: 335px;
  }
</style>

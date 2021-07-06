<template>
  <div class="channeinstall">
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="商户名称" prop="voucher_name">
          <el-input v-model="ruleForm.voucher_name"></el-input>
        </el-form-item>
        <el-form-item label="商户账号" prop="voucher_account">
          <el-input v-model="ruleForm.voucher_account"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" prop="voucher_password">
          <el-input v-model="ruleForm.voucher_password"></el-input>
        </el-form-item>
        <el-form-item label="商户密钥" prop="voucher_secret">
          <el-input v-model="ruleForm.voucher_secret"></el-input>
        </el-form-item>
        <el-form-item label="商户编号" prop="simple_num">
          <el-input v-model="ruleForm.simple_num"></el-input>
        </el-form-item>
        <el-form-item label="允许挂单">
          <el-radio-group v-model="ruleForm.type">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
          </el-radio-group>
          <div class="tif" v-show="ruleForm.type=='0'">超过授信后挂单</div>
        </el-form-item>
        <el-form-item label="商户地址" prop="voucher_address">
          <el-input v-model="ruleForm.voucher_address"></el-input>
        </el-form-item>
         <el-form-item label="联系人" prop="contact_name">
          <el-input v-model="ruleForm.contact_name"></el-input>
        </el-form-item>
         <el-form-item label="联系电话" prop="contact_phone">
          <el-input v-model="ruleForm.contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'channeinstall',
  //父组件通过props属性传递进来的数据
  props: {
      srmsg: {}
  },
  data() {
    return {
      ruleForm: {
        voucher_name: '十荟团-0522（下游商户）',
        voucher_account: 'shihuituan522',
        voucher_password: '123',
        voucher_secret: '1234',
        voucher_address: '广东省广州市天河区中山大道665',
        simple_num: 'SHT-00122',
        contact_name: '李书瑶',
        contact_phone: '18023869002',
        type: '0',
        description: '123'
      },
      rules: {
        voucher_name: [
          { required: true, message: '请选择活动资源', trigger: 'blur' }
        ],
        voucher_account: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        voucher_password: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        voucher_secret: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        voucher_address: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        contact_name: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        contact_phone: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        simple_num: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请填写活动形式', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    console.log(this.srmsg)
    if(this.srmsg.voucher_name){
      let str = JSON.stringify(this.srmsg) //系列化对象
      this.ruleForm = JSON.parse(str) //还原
      this.ruleForm.voucher_password = ''
      // this.updata =true
      console.log('ruleForm',this.ruleForm)
    }
  },
    methods: {
      submitForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(that.ruleForm.voucher_user_id){
              that.ruleForm.voucherUserId=that.ruleForm.voucher_user_id
              that.updman()
            }else{
              that.creman()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //创建商人
      async creman(){
        // console.log(key, keyPath)
       try {
         //创建商人
         let res = await this.$http.post("vouchers/createVoucherUser",this.ruleForm)
         this.res = res
         console.log('创建商人',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.data.code === 0){
          this.res=this.res.data
          this.justchange('2')
          console.log(this.res.code)
          // this.total=this.shengfen.data.data.last_page
          this.$message.success('创建成功！')
        }else if (this.res.data.code === 3){
          this.$message.error('创建失败！'+this.res.data.message)
        }
        else{
          // console.log(this.shengfen.status=='201')
          this.$message.error('创建失败！')
          // this.$message.error(this.res.message)
        }
        // console.log('shengfen',this.shengfen.data.data)

      },
      //修改商人
      async updman(){
        // console.log(key, keyPath)
       try {
         //修改商人
         let res = await this.$http.post("vouchers/updateVoucherUser",this.ruleForm)
         this.res = res
         console.log('修改商人',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.status === 201||this.res.status === 200){
          this.res=this.res.data
          this.justchange('2')
          console.log(this.res)
          // this.total=this.shengfen.data.data.last_page
          this.$message.success('修改成功！')
        }else{
          // console.log(this.shengfen.status=='201')
          this.$message.error('修改失败！')
        }
        // console.log('shengfen',this.shengfen.data.data)

      },
      justchange(test){
          this.$emit('justchange' , test);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .channeinstall{
    margin: 15px;
    background-color: #fff;

  }
  .frombox {
    width: 520px;
    padding: 15px;
  }
  .tif{
    color: red;
    position: absolute;
    text-align: center;
    width: 100%;
    top: 28px;
    left: 50%;
    margin-left: -50%;
  }
</style>

<template>
  <div class="channeinstall">
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="渠道名" prop="supplier_name">
          <el-input v-model="ruleForm.supplier_name"></el-input>
        </el-form-item>
        <el-form-item label="渠道编号" prop="passageway_no">
          <el-input v-model="ruleForm.passageway_no"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="voucher_account">
          <el-input v-model="ruleForm.voucher_account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="voucher_pwd">
          <el-input v-model="ruleForm.voucher_pwd"></el-input>
        </el-form-item>
        <el-form-item label="每日额度(元)" prop="daily_limit">
          <el-input v-model="ruleForm.daily_limit"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      qdmsg: {
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
  },
  data() {
    return {
      ruleForm: {
        supplier_name: '',
        supplier_id: '',
        voucher_account: '',
        voucher_pwd: '',
        daily_limit: '',
        description: '',
        order_url:'',
        callback_url:'',
        balance_url:'',
        order_search_url:'',
        passageway_no:''
      },
      rules: {
        supplier_name: [
          { required: true, message: '请输入渠道名', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passageway_no: [
          { required: true, message: '请填写渠道编号', trigger: 'blur' }
        ],
        voucher_account: [
          { required: true, message: '请填写账号', trigger: 'blur' }
        ],
        voucher_pwd: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        daily_limit: [
          { required: true, message: '请填写每日额度(元)', trigger: 'blur' }
        ]
      },
      updata:false,
      result:''
    }
  },
  created(){
    console.log(this.qdmsg)
    if(this.qdmsg.supplier_name){
      let str = JSON.stringify(this.qdmsg) //系列化对象
      this.ruleForm = JSON.parse(str) //还原
      this.ruleForm.voucher_pwd = ''
      this.updata =true
      console.log('ruleForm',this.ruleForm)
    }
  },
  //&&this.ruleForm.supplier_id==this.qdmsg.supplier_id
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.supplierId = this.ruleForm.supplier_id
            if(this.updata&&this.ruleForm.supplier_id==this.qdmsg.supplier_id){
               this.updataajx()
               console.log(1,this.ruleForm.supplier_id,this.qdmsg.supplier_id)
            }else{
              if(this.ruleForm.supplier_name==this.qdmsg.supplier_name){
                this.$message.error('渠道名已被占用，请重新填写')
              }else if(this.ruleForm.passageway_no==this.qdmsg.passageway_no){
                this.$message.error('渠道编号已被占用，请重新填写')
              }else if(this.ruleForm.voucher_account==this.qdmsg.voucher_account){
                this.$message.error('账号已被占用，请重新填写')
              }else{
                this.ruleForm.voucher_secret=1,
                this.ruleForm.order_url=1,
                this.ruleForm.callback_url=1,
                this.ruleForm.balance_url=1,
                this.ruleForm.order_search_url=1,
                this.ruleForm.supplier_id=''
                console.log(this.ruleForm)
                this.creajx()
                console.log(2)
              }
            }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm = {
          supplier_name: '',
          supplier_id: '',
          passageway_no: '',
          voucher_pwd: '',
          daily_limit: '',
          description: ''
        }
        this.updata = false
        // console.log(this.ruleForm)
        // this.$refs[formName].resetFields();
        console.log(this.ruleForm)
      },
      async updataajx(){
        try {
          //修改供货商
          let res = await this.$http.post("suppliers/updateVoucherSupplier", this.ruleForm)
          this.result = res
         } catch (err) {
                 alert('请求出错！')
               }
         if(this.result.status === 201||this.result.status === 200){
           this.$message.success('修改成功！')
           this.justchange('1')
         }else{
           this.$message.error('请求失败！')
         }
         console.log('result',this.result.data.data)
      },
      async creajx(){
        let that = this
        try {
          //新建供货商
          let res = await this.$http.post("suppliers/createVoucherSupplier", this.ruleForm).then(function(res) {
                        // var rs=res.data;
                        that.result = res
                        console.log(res);
                    })
                    .catch(function(error) {
                         if(error.response){
                               //请求已发出，但服务器使用状态代码进行响应

                               //落在2xx的范围之外
                              let errdata = error.response.data.errors
                               console.log('errdata',errdata);
                               for(var key in errdata){
                                 that.$message.error(errdata[key][0])
                                 console.log('errdata',key);
                               }

                               console.log(error.response.status);

                               console.log(error.response.headers);

                             } else {
                               //在设置触发错误的请求时发生了错误

                               console.log('Error',error.message);

                             }

                             console.log(error.config);
                    });

          console.log('res',res)
         } catch (err) {
           console.log(err)
         }
         if(this.result.status === 201||this.result.status === 200){
           this.$message.success('新增成功！')
           this.justchange('1')
         }else{
           this.$message.error('新增失败！')
         }
         console.log('result',this.result)
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

</style>

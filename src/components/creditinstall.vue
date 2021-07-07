<template>
  <div class="creditinstall">
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="余额" prop="amount">
          <el-input v-model="ruleForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="允许挂单">
          <el-radio-group v-model="ruleForm.type">
             <el-radio :label="0">是</el-radio>
             <el-radio :label="1">否</el-radio>
           </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">添加授信</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'creditinstall',
  //父组件通过props属性传递进来的数据
  props: {
      srmsg: {}
  },
  data() {
    return {
      ruleForm: {
        amount: '',
        type: 1,
        description: ''
      },
      res:'',
      rules: {
        amount: [
          { required: true, message: '请输入余额', trigger: 'blur' },
          { min: 3, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    console.log(this.srmsg)
      let str = JSON.stringify(this.srmsg) //系列化对象
     let newsrmsg = JSON.parse(str) //还原
      this.ruleForm.amount = newsrmsg.amount
      this.ruleForm.type = newsrmsg.type
      this.ruleForm.description = newsrmsg.description
      this.ruleForm.voucherUserId = newsrmsg.voucher_user_id
      // this.updata =true
      console.log('ruleForm',this.ruleForm)
  },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addtrust()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.ruleForm = {
          amount: '',
          type: 1,
          description: ''
        }
      },
      handleAvatarSuccess(res, file) {
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      },
      //添加授信
      async addtrust(){
        // console.log(key, keyPath)
       try {
         //添加授信
         let res = await this.$http.post("vouchers/updateVoucherUserAmount",this.ruleForm)
         this.res = res
         // console.log('添加授信',res,this.ruleForm)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.data.code === 0){
          this.res=this.res.data
          this.justchange('2')
          // console.log(this.res.code)
          // this.total=this.shengfen.data.data.last_page
          this.$message.success('添加授信成功！')
        }else if (this.res.data.code === 3){
          this.$message.error('添加授信失败！'+this.res.data.message)
        }
        else{
          this.$message.error('添加授信失败！')
        }

      },
      justchange(test){
          this.$emit('justchange' , test);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .creditinstall{
    margin: 15px;
    background-color: #fff;

  }
  .frombox {
    width: 520px;
    padding: 15px;
  }
  .avatar-uploader/deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

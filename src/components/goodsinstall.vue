<template>
  <div class="goodsinstall">
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="面额" prop="amount">
          <el-select v-model="ruleForm.amount" placeholder="请选择面额">
            <el-option label="100" value="100"></el-option>
            <el-option label="200" value="200"></el-option>
            <el-option label="300" value="300"></el-option>
            <el-option label="500" value="500"></el-option>
            <el-option label="800" value="800"></el-option>
            <el-option label="1000" value="1000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input v-model="ruleForm.discount"></el-input>
        </el-form-item>
        <el-form-item label="产品编码" prop="good_code">
          <el-input v-model="ruleForm.good_code"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="region">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option label="中石油" value="1"></el-option>
            <el-option label="中石化" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可用省份" prop="province">
           <el-checkbox-group v-model="ruleForm.province">
             <el-checkbox  v-for="city in shengfen" :label="city.id" :key="city.id" name="type">{{city.province}}</el-checkbox>
           </el-checkbox-group>
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
  name: 'goodsinstall',
  props: {
      qdid: {},
      syspmsg:{}
  },
  data() {
    return {
      ruleForm: {
        discount: '',
        amount: '',
        province: [],
        supplier_id:'',
        good_code:'',
        type:''
      },
      res:'',
      shengfen:[],
      rules: {
        discount: [
          { required: true, message: '请输入折扣', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        province: [
          { type: 'array', required: true, message: '请至少选择一个省份', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请选择面额', trigger: 'blur' }
        ],
        good_code: [
          { required: true, message: '请输入产品编码', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    console.log(this.qdid,this.syspmsg)
    this.getshengfen()
    console.log('this.syspmsg.province',this.syspmsg.province)
    if(this.syspmsg.amount){
      let str = JSON.stringify(this.syspmsg) //系列化对象
      this.ruleForm = JSON.parse(str) //还原
      // this.ruleForm = this.syspmsg
      this.ruleForm.province = this.ruleForm.province.split(",")
      console.log('this.ruleForm.province',this.ruleForm.province)
      this.ruleForm.supplierGoodId = this.syspmsg.supplier_good_id
    }

    this.ruleForm.supplier_id=this.qdid
  },
    methods: {
      submitForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let testcode = ''
            for(var key in that.ruleForm.province){
              testcode=testcode+that.ruleForm.province[key]+','
            }
            that.ruleForm.province=testcode
            if(that.ruleForm.supplierGoodId){
              this.updgoods()
            }else{
              this.cregoods()
            }

            console.log(this.ruleForm)
            // alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
          this.ruleForm.amount= "",
          this.ruleForm.created_at= "",
          this.ruleForm.discount= "",
          this.ruleForm.good_code= "",
          this.ruleForm.pay_amount= "",
          this.ruleForm.province= [],
          this.ruleForm.supplier_name= "",
          this.ruleForm.type= '',
          this.updated_at= ""

        // this.$refs[formName].resetFields();
      },
      //获取省份
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

      },
      //创建商品
      async cregoods(){
        // console.log(key, keyPath)
       try {
         //创建商品
         let res = await this.$http.post("supplier-goods/createVoucherSupplierGood",this.ruleForm)
         this.res = res
         console.log('创建商品',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.status === 201||this.res.status === 200){
          this.res=this.res.data
          this.justchange('1-2')
          console.log(this.res)
          // this.total=this.shengfen.data.data.last_page
          this.$message.success('创建成功！')
        }else{
          // console.log(this.shengfen.status=='201')
          this.$message.error('创建失败！')
        }
        // console.log('shengfen',this.shengfen.data.data)

      },
      //修改商品
      async updgoods(){
        // console.log(key, keyPath)
       try {
         //修改商品
         let res = await this.$http.post("supplier-goods/updateVoucherSupplierGood",this.ruleForm)
         this.res = res
         console.log('修改商品',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.status === 201||this.res.status === 200){
          this.res=this.res.data
          this.justchange('1-2')
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
  .goodsinstall{
    margin: 15px;
    background-color: #fff;
    width: 100%;
    .el-select {
        width: 100%;
    }
  }
  .demo-form {
      width: 460px;
  }
  .frombox/deep/.el-checkbox {
      float: left;
      margin-left: 0;
      width: 160px;
      margin: 0;
      padding: 0;
      color: #606266;
      font-weight: 500;
      font-size: 14px;
      position: relative;
      cursor: pointer;
      display: flex;
      white-space: nowrap;
      user-select: none;
      list-style: none;
      height: 40px;
      line-height: 40px;
      align-items: center;
  }
  .frombox/deep/.el-checkbox__input {
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      list-style: none;
  }
  .frombox/deep/.el-checkbox__label {
      display: inline-block;
      padding-left: 10px;
      line-height: 40px;
      font-size: 14px;
  }
  .frombox/deep/.el-input {
      width: 260px;
      float: left;
  }
  .frombox/deep/.el-select {
      width: 260px;
      float: left;
  }
  .frombox {
    width: calc( 100% - 280px);
    padding: 15px;
    box-sizing: border-box;
  }

</style>

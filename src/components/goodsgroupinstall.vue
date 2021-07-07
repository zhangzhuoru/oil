<template>
  <div class="goodsinstall">
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="面额" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="50" value="shanghai"></el-option>
            <el-option label="100" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="折扣" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="中石油" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可用省份" prop="resource">
           <el-radio-group v-model="ruleForm.resource">
             <el-radio label="全国"></el-radio>
             <el-radio label="北京"></el-radio>
             <el-radio label="天津"></el-radio>
             <el-radio label="广东"></el-radio>
           </el-radio-group>
        </el-form-item>
        <div class="tablebox">
          <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="date"
                label="渠道"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品编码"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="面额"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="折扣"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="类型"
                width="160">
              </el-table-column>
              <el-table-column
                prop="name"
                label="创建时间"
                width="160">
              </el-table-column>

              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.value"
                    active-color="#13ce66"
                    inactive-color="#999">
                  </el-switch>
                </template>
              </el-table-column>
            </el-table>
        </div>
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
  name: 'goodsinstall',
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:true
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:false
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:true
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:true
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:true
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:true
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        value:false
      }],
    }
  },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
    .el-select {
        width: 100%;
    }
    .tablebox{
      padding: 10px 15px;
    }
  }
  .frombox {
    padding: 15px;
  }
  .frombox/DEEP/.el-form-item__content{
      width: 520px;
    }

</style>

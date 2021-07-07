<template>
  <div class="goodsinstall">
    <div class="lable">
      <div class="channelsch">搜索</div>
    </div>
    <div class="morebox">
      <div class="inputbox">
        <el-input v-model="ruleForm.group_name"></el-input>
      </div>
      <div class="inputbox">
        <el-select v-model="ruleForm.province" placeholder="省份">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="inputbox">
        <el-select v-model="ruleForm.amount" placeholder="面额">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
<!--      <div class="inputbox">
        <el-select v-model="ruleForm.amount" placeholder="渠道商">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div> -->

      <div class="inputbox">
        <el-select v-model="ruleForm.status" placeholder="状态">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>


    <div class="tablebox">
      <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="group_name"
            label="分组名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="面额"
            width="160">
          </el-table-column>
          <el-table-column
            prop="discount"
            label="折扣"
            width="160">
          </el-table-column>
          <el-table-column
            prop="province"
            label="可用省份"
            width="160">
          </el-table-column>
          <el-table-column
            label="类型"
            width="160">
            <template slot-scope="scope">
              {{ scope.row.type == 1 ? '中石油':'中石化' }}
            </template>
          </el-table-column>
          <el-table-column
            label="算法类型"
            width="160">
            <template slot-scope="scope">
              {{ scope.row.compute_type == 1 ? '低价':'权重' }}
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="160">
            <template slot-scope="scope">
              {{ scope.row.pick == 1 ? '开启':'关闭' }}
            </template>
          </el-table-column>

          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="pagbox">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="centerDialogVisible"
      :append-to-body=true
      width="30%"
      center>
      <el-form  label-width="80px" :model="formLabelAlign">
        <el-form-item label="折扣">
          <el-input v-model="formLabelAlign.discount"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <div class="boxc">
            <el-switch
              v-model="formLabelAlign.pick"
              :active-value="1"
              :inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              active-color="#13ce66"
              inactive-color="#d2d2d2">
            </el-switch>
          </div>

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeadd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'goodsinstall',
  props: {
      srmsg: {},
      shengfen:[]
  },
  data() {
    return {
      input: '',
      centerDialogVisible:false,
      ruleForm: {
        voucher_user_id: '',
        status: '',
        amount: '',
        province: '',
        group_name: '',
        discount:''
      },
      formLabelAlign:{
        discount:'',
        pick:'',
        group_id:'',
        voucher_user_id:''
      },
      res:'',
      tableData: [{
        group_name: '',
        amount: '',
        province: '',
        type: 1,
        compute_type: '',
        pick:1,
      }],
      options1: [],
      options2: [{
        value: '100',
        label: '100'
      }, {
        value: '200',
        label: '200'
      }, {
        value: '300',
        label: '300'
      }, {
        value: '500',
        label: '500'
      }, {
        value: '800',
        label: '800'
      }, {
        value: '1000',
        label: '1000'
      }],
      options3: [],
      options4: [{
        value: '1',
        label: '开启'
      }, {
        value: '0',
        label: '关闭'
      }],
      value: ''
    }
  },
  created(){
    console.log(this.srmsg)
      let str = JSON.stringify(this.srmsg) //系列化对象
      let newsstr = JSON.parse(str) //还原
      this.ruleForm.voucher_user_id=newsstr.voucher_user_id

      // this.ruleForm.status='',
      // this.ruleForm.amount='',
      // this.ruleForm.province='',
      // this.ruleForm.group_name=''
      // this.updata =true
      this.scgoods()
      this.getgoodsman()
      console.log('ruleForm',this.ruleForm)
      //重新构造下拉框省份
      for(var ksy in this.shengfen){
        let test ={
          value:'',
          lable:''
        }
        test.value=this.shengfen[ksy].id
        test.label=this.shengfen[ksy].province
        this.options1.push(test)
      }
  },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.formLabelAlign.discount = row.discount
        this.formLabelAlign.pick = row.pick
        this.formLabelAlign.group_id = row.group_id
        this.formLabelAlign.voucher_user_id = this.ruleForm.voucher_user_id
        this.centerDialogVisible = !this.centerDialogVisible

      },//商户商品组查找商品
      async scgoods(){
        let that = this
        // console.log(key, keyPath)
       try {
         //商户商品组查找商品
         let res = await this.$http.post("voucher-user-goods/searchGroupGood",this.ruleForm)
         this.res = res
         console.log('查找商品',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.data.code === 0){
          this.tableData=this.res.data.data

          // console.log('testss',testss,this.res.data.data)
          this.tableData.province=this.res.data.data
          //转数字为省份
          for(var i=0;i<that.tableData.length;i++){
            let testss = that.options1.find(x => x.value == that.tableData[i].province);
            console.log('testss',testss)
            that.tableData[i].province=testss.label
          }
          // this.justchange('2')
          // console.log(this.res.code)
          // this.total=this.shengfen.data.data.last_page
          this.$message.success('查找商品成功！')
        }else if (this.res.data.code === 3){
          this.$message.error('查找商品失败！'+this.res.data.message)
        }
        else{
          // console.log(this.shengfen.status=='201')
          this.$message.error('查找商品失败！')
          // this.$message.error(this.res.message)
        }
        // console.log('shengfen',this.shengfen.data.data)

      },
      //商户选择商品组  启用/关闭
      async changeadd(){
        // console.log(key, keyPath)

       try {
         //商户选择商品组  启用/关闭
         let res = await this.$http.post("voucher-user-goods/updateUserGood",this.formLabelAlign)
         this.res = res
         console.log('更改',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.data.code === 0){
          this.scgoods()
          this.centerDialogVisible = false
          this.$message.success('更改成功！')
        }else if (this.res.data.code === 3){
          this.$message.error('更改失败！'+this.res.data.message)
        }
        else{
          // console.log(this.shengfen.status=='201')
          this.$message.error('更改失败！')
          // this.$message.error(this.res.message)
        }
        // console.log('shengfen',this.shengfen.data.data)

      },
       //筛选供应商
      async getgoodsman(){
       try {
         //筛选供应商
         let res = await this.$http.get("vouchers/findAllSupplier")
         this.res = res
         console.log('供应商',res)
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.res.)
        if(this.res.data.code === 0){
          //重新构造下拉框省份
          let testdata = this.res.data.data
          for(var ksy in testdata){
            let test ={
              value:'',
              lable:''
            }
            test.value=ksy
            test.label=testdata[ksy]
            this.options3.push(test)
          }
          console.log(testdata)
          this.$message.success('更改成功！')
        }else if (this.res.data.code === 3){
          this.$message.error('更改失败！'+this.res.data.message)
        }
        else{
          // console.log(this.shengfen.status=='201')
          this.$message.error('更改失败！')
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
    .lable{
      display: flex;
      margin-bottom: 5px;
      padding: 15px;
    }
    .inputbox{
      width: 200px;
      padding-left: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #f6f6f6;
    }
    .tablebox{
      padding: 10px 15px;
    }
    .pagbox{
      padding-bottom: 15px;
    }
  }
  .morebox{
    display: flex;
  }
  .channeladd{
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 2px 0 0 2px;
      color: #000;
      border: 1px solid #000;
      cursor: pointer;
  }
  .channelsch{
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 12px;
      border-radius: 2px 0 0 2px;
      background-color: rgba(22, 155, 213, 1);
      color: #fff;
      margin-left: 5px;
      cursor: pointer;
  }
  .boxc{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
</style>

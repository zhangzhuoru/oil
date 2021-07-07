<template>
  <div class="channelist">
    <div class="lable">
      <div class="channeladd" @click="gotoadd">新增</div>
    </div>

    <div class="tablebox">
      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="voucher_user_id"
            label="商户Id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="voucher_name"
            label="商户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
            width="120">
          </el-table-column>
          <el-table-column
            prop="amount"
            label="额度"
            width="120">
          </el-table-column>
          <el-table-column
            label="允许挂单"
            width="120">
            <template slot-scope="scope">
              {{scope.$index==0?'是':'否'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="voucher_account"
            label="账号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="contact_name"
            label="联系人"
            width="120">
          </el-table-column>
          <el-table-column
            prop="contact_phone"
            label="联系电话"
            width="160">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="160">
          </el-table-column>

          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="primary"
                @click="install(scope.$index, scope.row)">商品设置</el-button>
              <el-button
                size="mini"
                type="success"
                @click="handlexing(scope.$index, scope.row)">授信</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div class="pagbox">
      <el-pagination
        background
        layout="total,prev,pager,next,jumper"
        :total="tableData.length"
        :page-size="pagesize"
        :pager-count="pagerCount"
        :current-page="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'channelist',
  data() {
    return {
      input: '',
      pages:{
        per_page:20
      },
      pagesize:5,
      currentPage:1,
      pagerCount:5,
      tableData: [{
        voucher_user_id: '',
        voucher_name: '',
        balance: '',
        amount:'',
        type:0,
        voucher_account:'',
        contact_name:'',
        contact_phone:'',
        created_at:''
      }],
      total:1
    }
  },
  created(){
    this.getpage()
  },
    methods: {
      gotoadd(){
        let black = {
          amount: '',
          balance: '',
          contact_name: '',
          contact_phone: '',
          created_at: '',
          credit_time: '',
          description: '',
          end_time: '',
          simple_num: '',
          created_at: '',
          supplier_id: '',
          supplier_name: '',
          type: '',
          updated_at: '',
          voucher_account: '',
          voucher_address: '',
          voucher_name: '',
          voucher_password: '',
          voucher_secret: '',
          voucher_user_id: ''
        }
        console.log('black',black)
        this.justsrmsg(black)
        this.justchange('2-1')
      },
      handleEdit(index, row) {
        this.justsrmsg(row)
        this.justchange('2-1')
        console.log(index, row);
      },
      install(index, row) {
        this.justsrmsg(row)
        this.justchange('2-3')
        console.log(index, row);
      },
      handlexing(index, row) {
        this.justsrmsg(row)
        console.log(index, row);
        this.justchange('2-2')
      },
      handleCurrentChange(val){
        this.currentPage = val;
      },
      async getpage(){
        // console.log(key, keyPath)
       try {
         //商人列表
         let res = await this.$http.get("vouchers/findAllVoucherUser", this.pages)
         this.result = res
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.result.)
        if(this.result.status === 201||this.result.status === 200){
          console.log(this.result.status === 201)
          this.tableData=this.result.data.data.data
          this.total=this.result.data.data.last_page
          this.$message.success('请求成功！')
        }else{
          console.log(this.result.status=='201')
          this.$message.error('请求失败！')
        }
        console.log('result',this.result.data.data)

      },
      justchange(test){
        this.$emit('justchange' , test);
      },
      justsrmsg(test){
        this.$emit('justsrmsg' , test);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .channelist{
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
</style>

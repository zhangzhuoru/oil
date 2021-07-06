<template>
  <div class="channelist">
    <div class="lable">
      <div class="channeladd" @click="justchanger('1-1')">新增</div>
      <div class="channelsch">搜索</div>
    </div>
    <div class="inputbox">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
      </el-input>
    </div>

    <div class="tablebox">
      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%;">
          <el-table-column
            fixed
            prop="supplier_id"
            label="渠道Id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="supplier_name"
            label="渠道名"
            width="160">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="渠道余额"
            width="160">
          </el-table-column>
          <el-table-column
            prop="platform_balance"
            label="系统余额"
            width="160">
          </el-table-column>
          <el-table-column
            prop="voucher_account"
            label="账号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建时间"
            width="160">
          </el-table-column>
          <el-table-column
            label="操作"
            width="320">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="install(scope.$index, scope.row)">商品设置</el-button>
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
        supplier_id: '2016-05-03',
        supplier_name: '王小虎',
        balance: '上海市普陀区金沙江路 1518 弄',
        platform_balance:'',
        voucher_account:'',
        created_at:''
      }],
      dlid:{
        supplierId:''
      },

      dlres:'',
      total:1
    }
  },
  created(){
    this.getpage()
  },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
        this.justmsg(row)
        this.justchange('1-1')
      },
      justmsg(msg){
        this.$emit('justmsg' , msg);
      },
      install(index, row) {
        console.log(index, row);
        this.justqdid(row.supplier_id)
        this.justchange('1-2')
      },
      async handleDelete(index, row) {
        this.dlid.supplierId = row.supplier_id
        try {
          //删除供货商
          let res = await this.$http.post("suppliers/deleteVoucherSupplier", this.dlid)
          this.dlres = res
         } catch (err) {
                 this.$message.error('删除失败！')
         }
           // if(this.result.)
         if(this.dlres.status === 201||this.dlres.status === 200){
           this.getpage()
           this.$message.success('删除成功！')
         }else{
           // console.log(this.result.status=='201')
           this.$message.error('删除失败！')
         }
        console.log(index, row);
      },
      handleCurrentChange(val){
        this.currentPage = val;
      },
      async getpage(){
        // console.log(key, keyPath)
       try {
         //供货商列表
         let res = await this.$http.get("suppliers/findAllVoucherSupplier")
         this.result = res
        } catch (err) {
                console.log(err)
                alert('请求出错！')
              }
          // if(this.result.)
        if(this.result.status === 201||this.result.status === 200){
          this.tableData=this.result.data.data.data
          this.total=this.result.data.data.last_page
          // this.$message.success('请求成功！')
        }else{
          // console.log(this.result.status=='201')
          this.$message.error('请求失败！')
        }
        // console.log('result',this.result.data.data)

      },
      // 子组件通过emit方法触发父组件中定义好的函数，从而将子组件中的数据传递给父组件
      justchange(test){
          this.$emit('justchange' , test);
      },
      justchanger(test){
        console.log('justchanger' , test)
          this.$emit('justchanger' , test);
      },
      justqdid(test){
        console.log('justqdid' , test)
          this.$emit('justqdid' , test);
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

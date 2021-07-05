<template>
  <div class="goodsinstall">
    <div class="lable">
      <div class="channeladd" @click="justchange('1-3')">新增</div>
      <div class="channelsch">搜索</div>
      <div class="channelsch"  @click="justchange('1')">返回渠道列表</div>
    </div>
    <div class="inputbox">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="tablebox">
      <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="supplier_name"
            label="所属渠道"
            width="160">
          </el-table-column>
          <el-table-column
            label="类型"
            width="160">
            <template slot-scope="scope">
              {{scope.$index==1?'中石油':'中石化'}}
            </template>
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
            prop="good_code"
            label="商品编号"
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
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  name: 'goodsinstall',
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
        supplier_name: '',
        type: '',
        amount: '',
        discount:'',
        good_code:'',
        created_at:''
      }],
      total:1,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  created(){
    this.getpage()
  },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleCurrentChange(val){
        this.currentPage = val;
      },
      async getpage(){
        // console.log(key, keyPath)
       try {
         //供货商列表
         let res = await this.$http.get("supplier-goods/findAllVoucherSupplierGood")
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
      // 子组件通过emit方法触发父组件中定义好的函数，从而将子组件中的数据传递给父组件
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

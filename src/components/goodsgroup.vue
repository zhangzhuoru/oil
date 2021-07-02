<template>
  <div class="goodsinstall">

    <div class="lable">
      <div class="channeladd">新增</div>
      <div class="channelsch">搜索</div>
    </div>
    <div class="morebox">
      <div class="inputbox">
        <el-select v-model="value" placeholder="省份">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="inputbox">
        <el-select v-model="value" placeholder="面额">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="inputbox">
        <el-select v-model="value" placeholder="渠道商">
          <el-option
            v-for="item in options"
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
            prop="date"
            label="分组名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="name"
            label="面额"
            width="160">
          </el-table-column>
          <el-table-column
            prop="name"
            label="渠道名称"
            width="160">
          </el-table-column>
          <el-table-column
            prop="name"
            label="渠道折扣"
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
          <el-table-column
            prop="name"
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
        layout="prev, pager, next"
        :total="1000">
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
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row, scope) {
        console.log(index, row, scope);
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
</style>

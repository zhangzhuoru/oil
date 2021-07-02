<template>
  <div class="home">
    <div class="tittle">
      资金总览
    </div>
    <hr style="color: #999;">
    <div class="yue">
      系统商户余额
    </div>
    <div class="showbox">
      <div class="slbox">
        <div class="lpng">
          <img src="../assets/jine.png" alt="">
        </div>
        <div class="ltxt">
          <div class="lyues">
            商户总可用余额（元）
          </div>
          <div class="lyuex">
            {{yue}}
          </div>
          <div class="edus">
            商户总授信额度（元）
          </div>
          <div class="edux">
            {{edu}}
          </div>
        </div>
      </div>
      <div class="srbox">
        <div class="hejibox">
          <div class="hejs">合计（元）</div>
          <div class="hejx">{{heji}}</div>
        </div>
      </div>
    </div>
    <div class="yue gonghuo">
      供币商商户余额
    </div>
    <div class="hejitip">
      合计：<span>¥{{xheji}}</span>元（因部分接口有查询时限，此处数足仅供参考，如需准物值请登录供货注斫提供的后台）
    </div>
    <div class="shihua">
      <div class="shitem">
        <div class="itembox">
          <div class="itpng">
            <img src="../assets/yue.png" alt="">
          </div>
          <div class="ittxt">
            <div class="ittxt1">中石化1</div>
            <div class="ittxt2">可用余额（元）</div>
            <div class="ittxt3">{{yue}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      yue:1648.264,
      edu:19846.65974,
      heji:0,
      xheji:131313.1312
    }
  },
  mounted: function () {
     console.log(this.yue)
     this.heji=this.yue+this.edu
    this.yue= this.msg(this.yue)
    this.edu= this.msg(this.edu)
    this.xheji= this.msg(this.xheji)

    this.heji= this.msg(this.heji)
  },
    methods: {
      msg(x) {

       //强制保留两位小数
           var f = parseFloat(x);
           if (isNaN(f)) return false;
           var f = Math.round(x * 100) / 100;
           var s = f.toString();
           var rs = s.indexOf('.');
           if (rs < 0) {
               rs = s.length;
               s += '.';
           }
           while (s.length < (rs + 1) + 2) {
               s += '0';
           }
           //每三位用一个逗号隔开
           var leftNum=s.split(".")[0];
           var rightNum="."+s.split(".")[1];
           var result;
           //定义数组记录截取后的价格
           var resultArray=new Array();
           if(leftNum.length>3){
               var i=true;
               while (i){
                   resultArray.push(leftNum.slice(-3));
                   leftNum=leftNum.slice(0,leftNum.length-3);
                   if(leftNum.length<4){
                       i=false;
                   }
               }
               //由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
               var sortArray=new Array();
               for(var i=resultArray.length-1;i>=0;i--){
                   sortArray.push(resultArray[i]);
               }
               result=leftNum+","+sortArray.join(",")+rightNum;
           }else {
               result=s;
           }
           return result;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .home{
    margin: 15px;
    background-color: #fff;
    padding: 15px;
    .tittle{
      font-size: 16px;
      text-align: left;
    }
    .yue{
      font-size: 12px;
      color: #999;
      text-align: left;
      margin-top: 5px;
      margin-left: 10px;
    }
    .gonghuo{
      margin-top: 100px;
    }
    .hejitip{
      font-size: 16px;
      text-align: left;
      margin-left: 50px;
      margin-top: 30px;
      span{
        color: orange;
      }
    }
  }
  .showbox{
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    .slbox{
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-right: 1px solid #999;
      width: 50%;
      .lpng{
        width: 80px;
        height: 80px;
      }
      .lpng img{
        width: 100%;
        height: 100%;
      }
      .ltxt{
        padding-left: 50px;
      }
      .lyues,.edus{
        color: #9bb2c8;
        font-size: 16px;
      }
      .edus{
        margin-top: 15px;
      }
      .lyuex,.edux{
        color: #2c3e50;
        font-size: 20px;
        margin-top: 15px;
      }
    }
    .srbox{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50%;
      .hejs{
        color: orange;
        font-size: 20px;
        }
      .hejx{
        margin-top: 10px;
        color: orange;
        font-size: 24px;
        }
    }
  }
  .shihua{
    margin-top: 20px;
    margin-bottom: 30px;
    .itembox{
      padding: 20px 0;
      border: 1px solid #999;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      box-sizing: border-box;
      .itpng{
        width: 65px;
        height: 65px;
      }
      .itpng img{
        width: 100%;
        height: 100%;
      }
      .ittxt{
        margin-left: 30px;
      }
      .ittxt .ittxt1{
        font-size: 16px;
      }
      .ittxt .ittxt2{
        font-size: 14px;
        margin-top: 10px;
      }
      .ittxt .ittxt3{
        font-size: 22px;
        margin-top: 10px;
      }
    }
  }
</style>

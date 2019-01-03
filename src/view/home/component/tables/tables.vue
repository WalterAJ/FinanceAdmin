<template>
<div>
  <Row class="seach-bar" >
    <i-col span='5' class="search-item" v-for="(item, index) in searchVal" :key="index">
      <div class="label" for="">{{item.title}}：</div>
      <i-input v-model="item.val" placeholder="请输入..." class="search-input" @keyup.enter.native="search()"></i-input>
    </i-col>
  </Row>
  <Row class="seach-bar">
    <i-col  span='5' class="search-item">
      <div class="label" for="">开始日期：</div>
      <Date-picker v-model="searchDate.begin" format="yyyy-MM-dd" type="date" placeholder="选择日期" class="search-input"></Date-picker>
    </i-col>
    <i-col  span='5' class="search-item">
      <div class="label" for="">结束日期：</div>
      <Date-picker v-model="searchDate.end" format="yyyy-MM-dd" type="date" placeholder="选择日期" class="search-input"></Date-picker>
    </i-col>

    <Button @click="search()" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
    <Button @click="showEdit('add')"  type="success"><Icon type="search"/>+ 新增</Button>
  </Row>
  <i-table
    ref="table"
    stripe
    border
    :columns="columns"
    :data="nowData"
  ></i-table>
   <div class="page-container">
        <div class="page-content">
           <Page :total="dataCount" :page-size="pageSize" @on-change="changepage"
                show-total  show-elevator/>
        </div>
        <div class="clearfix"></div>
    </div>
     <Button style="margin: 10px 0;" type="primary" @click="exportExcel()">导出为Csv文件</Button>
      <edit-data :editType='editType' v-if="editShow" @addCancel="showEdit('add')"></edit-data>
  </div>
</template>
<script>
import EditData from '../editData'
export default {
  components:{
    EditData
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "日期",
          key: "date"
        }
      ],
      insideData:[],
      data: [
        {
          name: "王小明",
          age: '18',
          address: "北京市朝阳区芍药居",
          date: '2018-1-1'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-11'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-23'
        },
        {
          name: "张小刚",
          age: '25',
          address: "北京市海淀区西二旗",
          date: '2018-12-1'
        },
        {
          name: "李小红",
          age: '30',
          address: "上海市浦东新区世纪大道",
          date: '2018-8-1'
        },
        {
          name: "周小伟",
          age: '26',
          address: "深圳市南山区深南大道",
          date: '2018-1-30'
        }
      ],
      nowData:[],
      pageSize: 10,//每页显示多少条
      dataCount: 0,//总条数
      pageCurrent: 1,//当前页
      searchVal:[
        {
          title:'名字',
          key:'name',
          val:""
        },
        {
          title:'年龄',
          key:'age',
          val:""
        },
      ],
      searchDate:{
        begin:'',
        end:''
      },
      editShow:false,
      editType: {
        key:'',
        message:''
      }
      
    };
  },
  mounted(){
    this.insideData = this.data;
    this.page(this.insideData);
  },
  methods:{
    search(){
      let _this = this;
      this.insideData = this.data;
      //时间筛选
      if(this.searchDate.begin.getTime() > this.searchDate.end.getTime()){
         this.$Message.warning('结束日期必须大于起始日期！');
         return;
      }
      if(this.searchDate.begin){
        _this.insideData = _this.insideData.filter(item => {
          var itemDate = new Date(item.date).getTime();
          if(itemDate >= this.searchDate.begin.getTime()){
            return true;
          }
          return false;
        })
      }
      if(this.searchDate.end){
        _this.insideData = _this.insideData.filter(item => {
          var itemDate = new Date(item.date).getTime();
          if(itemDate <= this.searchDate.end.getTime()){
            return true;
          }
          return false;
        })
      }

      this.searchVal.forEach(element =>{
        _this.insideData = _this.insideData.filter(item => {
          return item[element.key].indexOf(element.val) >= 0;
        })
      })
      this.page(this.insideData);
      console.log(this.insideData);
    },
    showEdit(type){
      if(type == 'add'){
        this.editType.key = 'add';
        this.editType.message = '新增';
      }
      this.editShow = !this.editShow;
    },
    page(pdata){
      
      //分页显示所有数据总数
      this.dataCount = pdata.length;
      //循环展示页面刚加载时需要的数据条数
      this.nowData = [];
      if(this.dataCount < this.pageSize){
         this.nowData = pdata
      }else {
        for (let i = 0; i < this.pageSize; i++) {
          this.nowData.push(pdata[i]);
        }
      }
      
    },
    changepage(index) {
        //需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
        let _start = (index - 1) * this.pageSize;
        //需要显示结束数据的index
        let _end = index * this.pageSize;
        //截取需要显示的数据
        this.nowData = this.insideData.slice(_start, _end);
        //储存当前页
        this.pageCurrent = index;
      },
      exportExcel () {
        this.$refs.table.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  }
};
</script>
<style lang="less" scoped>
.seach-bar{
  display: flex;
  margin-bottom: 20px;
  .search-item{
    margin-right: 20px;
    .label{
      float: left;
      width: 70px;
      line-height: 32px;
    }
    .search-input{
      width: 200px;
    }
    
  }
  .search-btn{
      margin-right: 20px;
      text-align: center;
    }
  
}
.page-container{
  margin: 10px;
  .page-content{
    float: right;
  }
  .clearfix{
    clear: both;
  }
}

</style>

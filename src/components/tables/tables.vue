<template>
<div>
  <Row class="seach-bar">
    <i-col span='4' class="search-item" v-for="(item, index) in searchVal" key="item.name">
      <label for="">{{item.title}}：</label>
      <i-input v-model="item.val" placeholder="请输入..." class="search-input"></i-input>
    </i-col>

    <i-col span='4' class="search-item">
      <label for="">开始日期：</label>
      <Date-picker v-model="searchDate.begin" format="yyyy-MM-dd" type="date" placeholder="选择日期"></Date-picker>
    </i-col>
    <i-col span='4' class="search-item">
      <label for="">结束日期：</label>
      <Date-picker v-model="searchDate.end" format="yyyy-MM-dd" type="date" placeholder="选择日期"></Date-picker>
    </i-col>

    <Button @click="search()" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
  </Row>
  <i-table
    stripe
    border
    :columns="columns"
    :data="insideData"
  ></i-table>
  </div>
</template>
<script>
export default {
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
        }
      ],
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
      }
      
    };
  },
  mounted(){
    this.insideData = this.data;
  },
  methods:{
    search(){
      let _this = this;
      this.insideData = this.data;
      //时间筛选
      if(this.searchDate.begin){
        _this.insideData = _this.insideData.filter(item => {
          var itemDate = new Date(item.date).getTime();
          if(itemDate >= this.searchDate.begin.getTime()){
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
    }
  }
};
</script>
<style lang="less" scoped>
.seach-bar{
  display: flex;
  margin-bottom: 20px;
  .search-input{
  width: 200px;
  margin-right: 20px;
  }
  .search-btn{
   text-align: center;
  }
}

</style>

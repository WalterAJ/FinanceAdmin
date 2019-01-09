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
    <i-select  style="width:200px">
        <i-option value="beijing">北京市</i-option>
        <i-option value="shanghai" disabled>上海市</i-option>
        <i-option value="shenzhen">深圳市</i-option>
    </i-select>
    <Button @click="search()" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
    <Button @click="showEdit('add')"  type="success"><Icon type="search"/>+ 新增</Button>
  </Row>
  <Divider />
  <!-- 详细信息 -->
  <Row class="info">
    <i-col  span='5' class="info-item" v-for="(item, index) in information" :key="index">
      <div class="label" for="">推广成本</div>
      <span >1000</span>
    </i-col>
  </Row>
  <!-- 业务详情 -->
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
      <edit-data :editType='editType' v-if="editShow" @addCancel="showEdit('add')" @addData='addData'  @modifyData='modifyData '></edit-data>
  </div>
</template>
<script>
import EditData from "../editData";
export default {
  components: {
    EditData
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 45
        },
        {
          title: "编号",
          key: "ID",
          width: 80
        },
        {
          title: "平台名称",
          key: "platform",
          width: 90
        },
        {
          title: "客户姓名",
          key: "customerName"
        },
        {
          title: "客户手机号",
          key: "customerPhone",
          width: 120
        },
        {
          title: "首次借款时间",
          key: "fistLoanDate",
          width: 120
        },
        {
          title: "还款时间",
          key: "repayDate",
          width: 120
        },
        {
          title: "当前期数",
          key: "period",
          width: 90
        },
        {
          title: "在借本金",
          key: "principal"
        },
        {
          title: "应收利息",
          key: "receivableInterest"
        },
        {
          title: "已收利息",
          key: "receivedInterest"
        },
        {
          title: "逾本金",
          key: "overduePrincipal"
        },
        {
          title: "逾利息",
          key: "overdueInterest"
        },
        {
          title: "盈利",
          key: "profit"
        },
        {
          title: "状态",
          key: "status",
          filters: [
            {
              label: '正常',
              value: 0
            },
            {
              label: '逾期',
              value: 1
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 0) {
              return row.status == 0;
            } else if (value === 1) {
              return row.status == 1;
            }
          }
        },
        {
          title: "业务员",
          key: "operator",
          
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      insideData: [],
      data: [
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },
        {
          ID: "1",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736348",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "0",
          overduePrincipal: "700",
          overdueInterest: "300",
          profit: "0",
          status: "1",
          operator: "李四"
        },

        {
          ID: "2",
          platform: "爱尚",
          customerName: "张三",
          customerPhone: "13588736358",
          fistLoanDate: "2018-5-18",
          repayDate: "2018-5-25",
          period: "2",
          principal: "700",
          receivableInterest: "300",
          receivedInterest: "300",
          overduePrincipal: "0",
          overdueInterest: "0",
          profit: "300",
          status: "0",
          operator: "李四"
        }
      ],
      nowData: [],
      pageSize: 10, //每页显示多少条
      dataCount: 0, //总条数
      pageCurrent: 1, //当前页
      searchVal: [
        {
          title: "客户姓名",
          key: "customerName",
          val: ""
        },
        {
          title: "客户手机号",
          key: "customerPhone",
          val: ""
        }
      ],
      searchDate: {
        begin: "",
        end: ""
      },
      editShow: false,
      editType: {
        key: "modify",
        message: "修改"
      },//新增 或 编辑
      information:[]//资金信息
    };
  },
  mounted() {
    this.insideData = this.data;
    this.page(this.insideData);
    console.log(this.$store.state.user);
  },
  methods: {
    //搜索
    search() {
      let _this = this;
      this.insideData = this.data;
      //时间筛选
      if(this.searchDate.begin && this.searchDate.end){
        if (this.searchDate.begin.getTime() > this.searchDate.end.getTime()) {
          this.$Message.warning("结束日期必须大于起始日期！");
          return;
        }
      }
      if (this.searchDate.begin) {
        _this.insideData = _this.insideData.filter(item => {
          var itemDate = new Date(item.fistLoanDate).getTime();
          if (itemDate >= this.searchDate.begin.getTime()) {
            return true;
          }
          return false;   
        });
      }
      if (this.searchDate.end) {
        _this.insideData = _this.insideData.filter(item => {
          var itemDate = new Date(item.fistLoanDate).getTime();
          if (itemDate <= this.searchDate.end.getTime()) {
            return true;
          }
          return false;
        });
      }

      this.searchVal.forEach(element => {
        _this.insideData = _this.insideData.filter(item => {
          return item[element.key].indexOf(element.val) >= 0;
        });
      });
      this.page(this.insideData);
      console.log(this.insideData);
    },
    showEdit(type) {
      if (type == "add") {
        this.editType.key = "add";
        this.editType.message = "新增";
      }
      this.editShow = !this.editShow;
    },
    page(pdata) {
      //分页显示所有数据总数
      this.dataCount = pdata.length;
      //循环展示页面刚加载时需要的数据条数
      this.nowData = [];
      if (this.dataCount < this.pageSize) {
        this.nowData = pdata;
      } else {
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
    exportExcel() {

      this.$refs.table.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    },
    //添加数据
    addData(ndata) {
      this.data.push(ndata);
      this.insideData = this.data;
      this.page(this.insideData);
    },
    modifyData(ndata) {
      this.data.push(ndata);
      this.insideData = this.data; 
      this.page(this.insideData);
    }
  }
};
</script>
<style lang="less" scoped>
.seach-bar {
  display: flex;
  margin-bottom: 20px;
  .search-item {
    margin-right: 20px;
   
    .search-input {
      width: 200px;
    }
  }
  .search-btn {
    margin-right: 20px;
    text-align: center;
  }
}
.page-container {
  margin: 10px;
  .page-content {
    float: right;
  }
  .clearfix {
    clear: both;
  }
}
.label {
      float: left;
      width: 85px;
      line-height: 32px;
}
.info{
  span{
    line-height: 32px;
  }
}
</style>

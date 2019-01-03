<template>
  <div class="home-content">
    <Card>
      <Table ref="table"></Table>
     
    </Card>

  </div>
</template>

<script>
import Table from './component/tables/tables'

import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Table,
  },
  data () {
    return {
      addShow: true,
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    }
   
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
.home-content{
  position: relative;
}
</style>


<template>
  <div class="home-content">
    <Card>
      <tables></tables>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>

  </div>
</template>

<script>
import Tables from './component/tables/tables'

import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables,
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
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
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


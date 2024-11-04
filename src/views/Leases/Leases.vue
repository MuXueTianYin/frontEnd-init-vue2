<template>
  <page-header-wrapper>
    <div class="table-operator">
      <!--      <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>-->
      <a-button type="primary" icon="plus" @click="openLeasesForm()">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action" slot-scope="text, record">
        <a @click="openLeasesForm(record)">edit</a>
        <a-divider type="vertical" />
        <a @click="deletable(record)">Delete</a>
      </span>
    </a-table>
    <LeasesForm :visible.sync="showLeasesForm" :record="currentRecord" @update:visible="closeLeasesForm" @update-success="fetchData"></LeasesForm>
  </page-header-wrapper>
</template>

<script>
import Info from './components/Info'
import { list, Delete } from '@/api/leases'
import LeasesForm from './modules/LeasesForm.vue'

const columns = [
  {
    title: '租赁开始日期',
    dataIndex: 'startDate',
    key: 'startDate'
  },
  {
    title: '租赁结束日期',
    dataIndex: 'endDate',
    key: 'endDate'
  },
  {
    title: '每月租金',
    dataIndex: 'monthlyRent',
    key: 'monthlyRent'
  },
  {
    title: '押金',
    dataIndex: 'deposit',
    key: 'deposit'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime'
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'StandardList',
  components: {
    Info,
    LeasesForm
  },
  data () {
    return {
      data: [],
      columns,
      loading: false,
      status: 'all',
      pagination: {},
      current: 1,
      pageSize: 10,
      total: 50,
      showLeasesForm: false,
      currentRecord: {}
    }
  },
  methods: {
    openLeasesForm (record = {}) {
      this.currentRecord = record
      this.showLeasesForm = true
    },
    closeLeasesForm () {
      this.showLeasesForm = false
    },
   async fetchData (params = {}) {
     this.loading = true
      const PageRequest = {
        pageSize: 10,
        ...params
     }
     const res = await list(PageRequest)
     console.log(res.data)
     if (res.code === 0) {
       const { records, total } = res.data
       this.data = records
       const pagination = { ...this.pagination }
       pagination.total = total
       this.loading = false
       this.pagination = pagination
     }
    },
    async deletable (record) {
      // 确认操作
      this.$confirm({
        title: '确定要删除这条记录吗?',
        content: '此操作不可撤销',
        onOk: async () => {
          try {
            // eslint-disable-next-line no-undef
            const res = await Delete({ ids: [record.id] })
            if (res.code === 0) {
              this.$message.success('删除成功')
              this.fetchData()
            } else {
              this.$message.error('删除失败: ' + res.message)
            }
          } catch (error) {
            this.$message.error('删除失败')
          }
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination, filters)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetchData({
        pageSize: pagination.pageSize,
        current: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order
      })
    }
  },

  mounted () {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}

.list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>

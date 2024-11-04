<template>
  <page-header-wrapper>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="请输入搜索参数">
              <a-input v-model="queryParam.searchText" placeholder="搜索景点名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button type="primary" @click="fetchDataWithQuery">查询</a-button>
            <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="openAttractionForm()">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action" slot-scope="text, record">
        <a @click="openAttractionForm(record)">edit</a>
        <a-divider type="vertical" />
        <a @click="deletable(record)">Delete</a>
      </span>
    </a-table>
    <AttractionForm :visible.sync="showAttractionForm" :record="currentRecord" @update:visible="closeAttractionForm" @update-success="fetchData"></AttractionForm>
  </page-header-wrapper>
</template>

<script>
import { list, Delete } from '@/api/attractions'
import AttractionForm from './modules/AttractionsForm'

const columns = [
  { title: 'ID', dataIndex: 'id' },
  { title: '景点名称', dataIndex: 'name' },
  { title: '描述', dataIndex: 'description' },
  { title: '经度', dataIndex: 'latitude' },
  { title: '纬度', dataIndex: 'longitude' },
  { title: 'Actions', key: 'action', scopedSlots: { customRender: 'action' } }
]
export default {
  name: 'StandardList',
  components: {
    AttractionForm
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
      showAttractionForm: false,
      currentRecord: {},
      searchText: '',
      queryParam: {}
    }
  },
  methods: {
    openAttractionForm (record = {}) {
      this.currentRecord = record
      this.showAttractionForm = true
    },
    closeAttractionForm () {
      this.showAttractionForm = false
    },
    async fetchDataWithQuery () {
      const params = {
        ...this.queryParam
      }
      this.fetchData(params)
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

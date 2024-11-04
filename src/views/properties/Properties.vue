<template>
  <page-header-wrapper>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="请输入搜索参数">
              <a-input v-model="queryParam.searchText" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="是否可租">
              <a-select v-model="queryParam.isAvailable" placeholder="请选择" default-value="1">
                <a-select-option value="0">不可租</a-select-option>
                <a-select-option value="1">可租</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="fetchDataWithQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <!--      <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>-->
      <a-button type="primary" icon="plus" @click="openPropertiesForm()">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="handleTableChange" :loading="loading">
      <a slot="isAvailable" slot-scope="text">{{ text===1?'可租':'不可租' }}</a>
      <a slot="images" slot-scope="text, record" @click="openImage(record)">查看图片</a>
      <span slot="action" slot-scope="text, record">
        <a @click="openPropertiesForm(record)">edit</a>
        <a-divider type="vertical" />
        <a @click="deletable(record)">Delete</a>
      </span>
    </a-table>
    <PropertiesForm :visible.sync="showPropertiesForm" :record="currentRecord" @update:visible="closePropertiesForm" @update-success="fetchData"></PropertiesForm>
  </page-header-wrapper>
</template>

<script>
import Info from './components/Info'
import { list, Delete } from '@/api/properties'
import PropertiesForm from './modules/PropertiesForm.vue'

const columns = [
  {
    dataIndex: 'title',
    key: 'title',
    title: '名称'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: '租金',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '卧室数量',
    dataIndex: 'numBedrooms',
    key: 'numBedrooms'
  },
  {
    title: '浴室数量',
    dataIndex: 'numBathrooms',
    key: 'numBathrooms'
  },
  {
    title: '是否可租',
    dataIndex: 'isAvailable',
    key: 'isAvailable',
    scopedSlots: { customRender: 'isAvailable' }
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
    title: '图片',
    key: 'image',
    scopedSlots: { customRender: 'images' }
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
    PropertiesForm
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
      showPropertiesForm: false,
      currentRecord: {},
      searchText: '',
      queryParam: {}
    }
  },
  methods: {
    openPropertiesForm (record = {}) {
      this.currentRecord = record
      this.showPropertiesForm = true
    },
    closePropertiesForm () {
      this.showPropertiesForm = false
    },
    openImage (record) {
      this.$router.push({ name: 'PropertyImages', query: { id: record.id } })
    },
    async fetchDataWithQuery () {
      // 构建查询参数
      const params = {
        ...this.queryParam
      }
      // 调用fetchData方法并传入查询参数
      this.fetchData(params)
    },
   async fetchData (params = {}) {
     this.loading = true
      const PageRequest = {
        ...params,
        pageSize: this.pagination.pageSize || 10,
        current: this.pagination.current || 1
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
        ...pagination,
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

<template>
  <page-header-wrapper>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="openPropertyImagesForm()">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" :loading="loading">
      <img
        slot="images"
        alt="example"
        slot-scope="text, record"
        :src="record.imageUrl"
        style="width: 100px;height: 100px;"
      />
      <span slot="action" slot-scope="text, record">
        <a @click="openPropertyImagesForm(record)">edit</a>
        <a-divider type="vertical" />
        <a @click="deletable(record)">Delete</a>
      </span>
    </a-table>
    <PropertyImagesForm :visible.sync="showPropertyImagesForm" :record="currentRecord" @update:visible="closePropertyImagesForm" @update-success="fetchPropertyImageById"></PropertyImagesForm>
  </page-header-wrapper>
</template>

<script>
import Info from './components/Info'
import { Delete, getById } from '@/api/propertyImages'
import PropertyImagesForm from './modules/PropertyImagesForm.vue'

const columns = [
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '图片',
    key: 'imageUrl',
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
    PropertyImagesForm
  },
  data () {
    return {
      data: [],
      columns,
      loading: false,
      status: 'all',
      pagination: {},
      showPropertyImagesForm: false,
      propertyId: null,
      currentRecord: {}
    }
  },
  methods: {
    openPropertyImagesForm (record = {}) {
      record.propertyId = this.propertyId
      this.currentRecord = record
      this.showPropertyImagesForm = true
    },
    closePropertyImagesForm () {
      this.showPropertyImagesForm = false
    },
    async fetchPropertyImageById (id) {
      const propertyId = id || this.propertyId
      try {
        const res = await getById(propertyId)
        if (res.code === 0) {
          // 处理获取到的数据，例如设置到data属性中
          console.log(res.data)
          this.data = res.data
        } else {
          this.$message.error('获取图片失败: ' + res.message)
        }
      } catch (error) {
        this.$message.error('获取图片失败')
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
              this.fetchPropertyImageById()
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
    }
  },

  mounted () {
    const propertyId = this.$route.query.id
    if (propertyId) {
      this.propertyId = propertyId
      this.fetchPropertyImageById(propertyId)
    }
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

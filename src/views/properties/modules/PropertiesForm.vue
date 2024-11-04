<template>
  <a-modal
    :visible="visible"
    title="租户信息"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item label="酒店标题或名称" :labelCol="labelCol" :wrapperCol="wrapperCol" >
        <a-input v-model="formData.title" />
      </a-form-item>
      <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.description" />
      </a-form-item>
      <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.address" />
      </a-form-item>
      <a-form-item label="租金" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.price" />
      </a-form-item>
      <a-form-item label="卧室数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.numBedrooms" />
      </a-form-item>
      <a-form-item label="浴室数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.numBathrooms" />
      </a-form-item>
      <a-form-item label="是否可租" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.isAvailable" />
      </a-form-item>
      <a-form-item label="图片" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="!formData.id">
        <div class="clearfix">
          <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" list-type="picture">
            <a-button> <a-icon type="upload" /> 上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/properties'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this),
      formData: {
        realName: '',
        phoneNumber: '',
        email: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        createTime: '',
        updateTime: ''
      },
      fileList: []
    }
  },
  watch: {
    record: {
      immediate: true,
      handler (newValue) {
        this.formData = { ...newValue }
      }
    }
  },
  methods: {
   async handleSubmit () {
     const { $notification } = this
      if (this.formData.id) {
        const res = await update(this.formData)
        if (res.code !== 0) {
          $notification['error']({
            message: '提示',
            description: '出错了：' + res.message,
            duration: 8
          })
          return
        }
        $notification['success']({
          message: '提示',
          description: '修改成功' + res.message,
          duration: 8
        })
      } else {
        const { fileList } = this
        const formData = new FormData()
        fileList.forEach(file => {
          formData.append('files', file)
        })
        formData.append('properties', JSON.stringify(this.formData))
        console.log(formData)
       const res = await add(formData)
        if (res.code !== 0) {
          $notification['error']({
            message: '提示',
            description: '出错了：' + res.message,
            duration: 8
          })
          return
        }
        $notification['success']({
          message: '提示',
          description: '添加成功' + res.message,
          duration: 8
        })
      }
     this.$emit('update-success') // 触发自定义事件
      // 在这里实现表单提交逻辑
      console.log('Form Data:', this.formData)
      this.$emit('update:visible', false) // 关闭模态框
    },
    handleCancel () {
      this.$emit('update:visible', false) // 关闭模态框
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false
    }
  }
}
</script>

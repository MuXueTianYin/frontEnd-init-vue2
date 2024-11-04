<template>
  <a-modal
    :visible="visible"
    title="图片上传"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item label="更新图片" :labelCol="labelCol" :wrapperCol="wrapperCol" >
        <div class="clearfix">
          <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload" list-type="picture" >
            <a-button> <a-icon type="upload" /> 上传图片 </a-button>
          </a-upload>
        </div>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/propertyImages'
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
        imageUrl: ''
      },
      file: null,
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
     const { file } = this
     const formData = new FormData()
     console.log(this.formData.propertyId)
     formData.append('file', file)
     if (this.formData.id) {
       const formDataAdd = { id: this.formData.id, propertyId: this.formData.propertyId }
       formData.append('Propertyimages', JSON.stringify(formDataAdd))
       const res = await update(formData)
       if (res.code !== 0) {
         $notification['error']({
           message: '提示',
           description: '出错了：' + res.message,
           duration: 8
         })
         return
       }
     } else {
       formData.append('propertyId', this.formData.propertyId)
       const res = await add(formData)
       if (res.code !== 0) {
         $notification['error']({
           message: '提示',
           description: '出错了：' + res.message,
           duration: 8
         })
         return
       }
     }
     console.log(formData)
     $notification['success']({
       message: '提示',
       description: '添加成功',
       duration: 8
     })
     this.$emit('update-success') // 触发自定义事件
      // 在这里实现表单提交逻辑
      console.log('Form Data:', this.formData)
      this.$emit('update:visible', false) // 关闭模态框
    },
    handleCancel () {
      this.$emit('update:visible', false) // 关闭模态框
    },
    handleRemove (file) {
      const index = this.file.indexOf(file)
      const newFileList = this.file.slice()
      this.file = null
      newFileList.splice(index, 1)
      this.file = newFileList
    },
    beforeUpload (file) {
      this.file = file
      this.fileList = [file]
      console.log(this.fileList)
      return false
    }
  }
}
</script>

<template>
  <a-modal
    :visible="visible"
    title="酒店信息"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item label="酒店名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.name" />
      </a-form-item>
      <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea v-model="formData.description" />
      </a-form-item>
      <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input-number v-model="formData.longitude" style="width: 100%;" />
      </a-form-item>
      <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input-number v-model="formData.latitude" style="width: 100%;" />
      </a-form-item>
      <a-form-item label="酒店评分" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input-number v-model="formData.rating" style="width: 100%;" min="0" max="5" step="0.1" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/hotels'
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
        name: '',
        description: '',
        longitude: null,
        latitude: null,
        rating: null
      }
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
        const res = await add(this.formData)
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
    }
  }
}
</script>

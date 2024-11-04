<template>
  <a-modal
    :visible="visible"
    title="租户信息"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item label="租赁开始日期" :labelCol="labelCol" :wrapperCol="wrapperCol" >
        <a-input v-model="formData.startDate" />
      </a-form-item>
      <a-form-item label="租赁结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.endDate" />
      </a-form-item>
      <a-form-item label="每月租金" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.monthlyRent" />
      </a-form-item>
      <a-form-item label="押金" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.deposit" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/leases'
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

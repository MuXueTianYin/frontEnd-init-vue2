<template>
  <a-modal
    :visible="visible"
    title="租户信息"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" >
        <a-input v-model="formData.realName" />
      </a-form-item>
      <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.phoneNumber" />
      </a-form-item>
      <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.identityNumber" />
      </a-form-item>
      <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.email" />
      </a-form-item>
      <a-form-item label="紧急联系人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.emergencyContactName" />
      </a-form-item>
      <a-form-item label="紧急联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-model="formData.emergencyContactPhone" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { add, update } from '@/api/tenant'
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

<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="add-column-container">
    <el-form-item
        prop="label"
        label="表头label:"
        :rules="[
      { required: true, message: '表头label不能为空', trigger: 'blur' }
    ]"
    >
      <el-input v-model="dynamicValidateForm.label"></el-input>
    </el-form-item>
    <el-form-item
        label="表头prop:"
        prop="prop"
        :rules="{
      required: true, message: '表头prop不能为空', trigger: 'blur'
    }"
    >
      <el-input v-model="dynamicValidateForm.prop"></el-input>
    </el-form-item>
    <el-form-item
            label="表头width:"
            prop="width"
    >
      <el-input v-model="dynamicValidateForm.width"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddColumn',
  data() {
    return {
      dynamicValidateForm: {
        prop: '',
        label: ''
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.dynamicValidateForm.label, this.dynamicValidateForm.prop, this.dynamicValidateForm.width)
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-column-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -120px;
  z-index: 1001;
  width: 400px;
  height: 240px;
  padding-right: 40px;
  background-color: white;
  border-radius: 10px;
}
</style>

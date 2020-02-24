<template>
  <el-dialog
  title="修改地址"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
  >
    <el-form
      label-width="100px"
      :rules="formRules"
      :model="info"
    >
      <el-form-item label="省市区/县" prop="address1">
        <el-cascader
          :options="citydata"
          v-model="info.address1"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="address2">
        <el-input v-model="info.address2"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import citydata from "commonjs/citydata";
export default {
  name: "EditDialog",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      citydata,
      info: {
        address1: [],
        address2: ""
      },
      formRules: {
        address1: [
          { required: true, message: "请选择省市区/县", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  }
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
<template>
  <el-dialog
    :title="'添加'+paramsType"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
    @close="closeHandle"
  >
    <el-form
      label-width="120px"
      :model="paramData"
      :rules="formRules"
      ref="form"
    >
      <el-form-item
        :label="paramsType+'名称'"
        prop="attr_name"
      >
        <el-input v-model="paramData.attr_name"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_uploadAddParam"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { uploadAddParam } from "network/goods";
export default {
  name: "AddDialog",
  props: {
    dialogVisible: Boolean,
    showingParams: Object
  },
  data() {
    return {
      paramData: {
        attr_name: ""
      },
      formRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    paramsType() {
      if (this.showingParams.attr_sel === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    },
    //MARK:  将 newParams （描述正在 添加 的参数数据） 设置到 计算属性， 会根据props 的变化 而 变化
    newParam() {
      return {
        ...this.showingParams, // 扩展 传入的showingParams 的所有属性
        attr_name: this.paramData.attr_name
      };
    }
  },
  methods: {
    closeHandle() {
      this.$refs.form.resetFields();
    },
    async _uploadAddParam() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        const { attr_name, attr_sel } = this.newParam; //解构出 所需的 属性
        const res = await uploadAddParam(this.newParam.id, {
          attr_sel,
          attr_name
        });

        if (res.meta.status !== 201) {
          this.$message.error(`${this.paramsType}添加失败`);
        } else {
          this.$message.success(`${this.paramsType}添加成功`);

          this.$emit("addSuccess");
        }
        this.$emit("update:dialogVisible", false);
      });
    }
  }
};
</script>

<style>
</style>
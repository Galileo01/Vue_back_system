<template>
  <el-dialog
    title="编辑分类"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
    @close="closeHandle"
    @open="getCate"
  >
    <el-form
      :model="cateInfo"
      :rules="formRules"
      label-width="100px"
      ref="form"
    >
      <el-form-item
        prop="cat_name"
        label="分类名称"
      >
        <el-input v-model="cateInfo.cat_name"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_upload"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getCateByid, uploadEdit } from "network/goods";
export default {
  name: "EditDialog",
  props: {
    dialogVisible: Boolean,
    id: Number
  },
  data() {
    return {
      formRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      cateInfo: {
        cat_name: ""
      }
    };
  },
  methods: {
    async getCate() {
      const res = await getCateByid(this.id);
      if (res.meta.status !== 200) {
        console.log(res);

        this.$message.error("分类获取失败");
        this.$emit("update:dialogVisible", false);
      } else {
        this.cateInfo = res.data;
      }
    },
    closeHandle() {
      this.cateInfo.cat_name = "";
    },
    _upload() {
      this.$ref.form.validate(async valid => {
        if (!valid) return;
        const res = await uploadEdit(this.id, this.cateInfo.cat_name);

        if (res.meta.status !== 200) {
          this.$message.error("分类编辑失败");
        } else {
          this.$message.success("分类编辑成功");
          this.$emit("editSuccess");
        }
        this.$emit("update:dialogVisible", false);
      });
    }
  }
};
</script>

<style>
</style>
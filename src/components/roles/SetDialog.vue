<template>
  <el-dialog
    title="设置权限"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
    @close="$emit('setClose')"
    @open="updateTreeChecked"
  >

    <el-tree
      :data="rightslist"
      :props="treeProps"
      default-expand-all
      node-key="id"
      show-checkbox
      :default-checked-keys="defKeys"
      ref="tree"
    >

    </el-tree>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button
        type="primary"
        @click="_uploadSet"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllRights, uploadRights } from "network/rights";
export default {
  name: "SetDialog",
  data() {
    return {
      rightslist: [],
      treeProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  props: {
    dialogVisible: Boolean,
    id: Number,
    defKeys: Array
  },
  methods: {
    async _uploadSet() {
      const tree = this.$refs.tree;
      //获取 选中的，半选的id
      const rids = [
        ...tree.getCheckedKeys(),
        ...tree.getHalfCheckedKeys()
      ].join(",");
      const res = await uploadRights(this.id, rids);
      console.log(res);
      
      if (res.meta.status !== 200) {
        this.$message.error("权限分配失败");
      } else {
        this.$message.success("权限分配成功");
        this.$emit("update:dialogVisible", false);
        //提示 父组件 刷新 角色列表
        this.$emit("setSuccess");
      }
    },

    //获取所有权限
    async _getAllRights() {
      const res = await getAllRights();
      console.log(res);
      
      if (res.meta.status !== 200) {
        this.$message.error("权限列表获取失败");
      } else {
        this.rightslist = res.data;
      }
    },
    //每次打开  对话框 ，手动设置 选中 的节点
    updateTreeChecked() {
      if (this.$refs.tree) 
      this.$refs.tree.setCheckedKeys(this.defKeys, true);
      else {
          //第一次 打开 对话框 ，没有渲染dom ，无法引用tree 组件 
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(this.defKeys, true);
        });
      }
    }
  },
  created() {
    this._getAllRights();
  }
};
</script>

<style>
</style>
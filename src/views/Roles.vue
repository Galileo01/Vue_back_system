<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="addRole"
          >添加角色</el-button>
        </el-col>
      </el-row>
      <roles-table
        :roleslist="roleslist"
        @edit="edit"
        @deleteRole="_deleteRole"
        @setRight="setRight"
      ></roles-table>
    </el-card>

    <!-- 角色添加 对话框-->
    <add-dialog
      :dialogVisible.sync="addRoleVisible"
      @addSuccuss="_getRoleslist"
    ></add-dialog>
    <!--角色编辑 对话框-->
    <edit-dialog
      :dialogVisible.sync="editRoleVisible"
      :id="edittingId"
      @editSuccuss="_getRoleslist"
    ></edit-dialog>
    <set-dialog
      :dialogVisible.sync="setRightsVisible"
      :id="settingId"
      :defKeys="defKeys"
      @setClose="defKeys=[]"
      @setSuccess="_getRoleslist"
    ></set-dialog>
  </div>
</template>

<script>
import { getRoleslist, deleteRole } from "network/roles";
import RolesTable from "components/roles/RolesTable";
import AddDialog from "components/roles/AddDialog";
import EditDialog from "components/roles/EditDialog";
import SetDialog from "components/roles/SetDialog";
export default {
  name: "Roles",
  data() {
    return {
      roleslist: [],
      addRoleVisible: false,
      editRoleVisible: false,
      edittingId: 0,
      setRightsVisible: false,
      settingId: 0,
      defKeys: [] // 某个 角色已经选中 的权限 ，用于 SetDialog 组件，渲染选中的权限
    };
  },
  methods: {
    async _getRoleslist() {
      const res = await getRoleslist();
      if (res.meta.status !== 200) {
        this.$message.error("角色列表获取失败");
      } else {
        this.roleslist = res.data;
      }
    },
    addRole() {
      this.addRoleVisible = true;
    },
    edit(id) {
      this.edittingId = id;
      this.editRoleVisible = true;
    },
    //点击tag 组件的关闭按钮 ，触发权限的删除
    async _deleteRole(id) {
      const result = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(error => error);
      if (result === "cancel") {
        this.$message.info("已取消删除操作");
      } else {
        const res = await deleteRole(id);
        if (res.meta.status !== 200) {
          this.$message.error("角色删除失败");
        } else {
          this.$message.success("角色删除成功");
          //重新 获取 角色列表
          this._getRoleslist();
        }
      }
    },
    setRight(role) {
      this.getDefKeys(role, this.defKeys);
      this.setRightsVisible = true;
      this.settingId = role.id;
    },
    getDefKeys(node, arr) {
      //第三级 节点 没有children 属性
      if (!node.children) {
        arr.push(node.id);
        return;
      } else {
        node.children.forEach(value => {
          this.getDefKeys(value, arr);
        });
      }
    }
  },
  created() {
    this._getRoleslist();
  },
  components: {
    RolesTable,
    AddDialog,
    EditDialog,
    SetDialog
  }
};
</script>

<style>
</style>
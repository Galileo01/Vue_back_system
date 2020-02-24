<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

      <!-- 搜索-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            @clear="_getUsers"
            v-model="queryInfo.query"
            @keyup.enter.native="_getUsers"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="_getUsers"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="adddialogVisible=true"
          >添加用户</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <users-table
        :users="users"
        @edit="edit"
        @delete="deleteFun"
        @allocate="allocate"
      ></users-table>
      <!--底部分页栏 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!--添加用户 的对话框-->
    <add-dialog :dialogVisible.sync="adddialogVisible"></add-dialog>
    <edit-dialog
      :dialogVisible.sync="editdialogVisible"
      :id="editingId"
      @editSuccess="_getUsers()"
    ></edit-dialog>
    <set-role-dialog
      :dialogVisible.sync="setdialogVisible"
      :user="settingUser"
      @allocateSuccess="allocateSuccess"
    ></set-role-dialog>
  </div>
</template>

<script>
import { getUsers, changeUserState, addUser, deleteUser } from "network/users";
import UsersTable from "components/user/UsersTable";
import AddDialog from "components/user/AddDialog";
import EditDialog from "components/user/EditDialog";
import SetRoleDialog from "components/user/SetRoleDialog";
export default {
  name: "Users",
  data() {
    return {
      //  获取用户数据 的传入参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      //所有 用户
      users: [],
      //
      total: 0,
      adddialogVisible: false,
      editdialogVisible: false,
      editingId: 0, //正在 编辑 的id ，传入 editDialog,
      setdialogVisible: false,
      settingUser: {}//正在 设置 角色的 id
    };
  },
  created() {
    this._getUsers();
  },
  methods: {
    //获取 用户数据
    _getUsers() {
      getUsers(this.queryInfo).then(res => {
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error("用户列表 获取失败");
        } else {
          this.users = res.data.users;
          this.total = res.data.total;
        }
      });
    },

    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this._getUsers();
    },
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this._getUsers();
    },

    //接受 UserTable 组件传来的 id
    edit(id) {
      this.editingId = id;
      this.editdialogVisible = true;
    },
    async deleteFun(id) {
      //弹出确认框 ，确认 删除操作
      const result = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(error => error);
      // 将 取消操作的 Promise 结果 也用result 接受

      if (result === "cancel") {
        this.$message.info("已取消删除操作");
      } else {
        const res = await deleteUser(id);
        if (res.meta.status !== 200) {
          this.$message.error("用户删除失败");
        } else {
          this.$message.success("用户删除成功");
        }
      }
    },
    allocate(user) {
      this.setdialogVisible = true;
      this.settingUser = user;
    },allocateSuccess(){
      this.setdialogVisible=false;
      this._getUsers();
    }
  },
  components: {
    UsersTable,
    AddDialog,
    EditDialog,
    SetRoleDialog
  }
};
</script>

<style>
</style>
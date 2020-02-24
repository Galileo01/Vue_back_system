<template>
  <div class="params">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-row
        class="cas-row"
        type="flex"
        align="middle"
      >
        <el-col :span="4">
          <span>选择商品分类:</span>
        </el-col>
        <el-col :span="6">
          <el-cascader
            expand-trigger="hover"
            v-model="cascaderIds"
            :options="parentCates"
            :props="cascaderProps"
            @change="handleChange"
            clearable
            class="params-cas"
          ></el-cascader>
        </el-col>
      </el-row>

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="动态参数"
          name="many"
        >
          <el-button
            size="mini"
            type="primary"
            :disabled="isbtnDisabled"
            @click="addDialogVisible=true"
          >添加参数</el-button>
          <params-table
            :tableData="manyTableData"
            type="many"
            @edit="edit"
            @remove="remove"
          ></params-table>
        </el-tab-pane>
        <el-tab-pane
          label="静态属性"
          name="only"
        >
          <el-button
            size="mini"
            type="primary"
            :disabled="isbtnDisabled"
            @click="addDialogVisible=true"
          >添加属性</el-button>
          <params-table
            :tableData="onlyTableData"
            type="only"
            @edit="edit"
            @remove="remove"
          ></params-table>
        </el-tab-pane>

      </el-tabs>

    </el-card>
    <add-dialog
      :dialogVisible.sync="addDialogVisible"
      :showingParams="showingParams"
      @addSuccess="_getPramas"
    ></add-dialog>
    <edit-dialog
      :dialogVisible.sync="editDialogVisible"
      :id="editingId"
      :showingParams="showingParams"
      @editSuccess="_getPramas"
    ></edit-dialog>
  </div>
</template>

<script>
import { getAllLevelCate, getPramas, deleteParam } from "network/goods.js";
import ParamsTable from "components/params/ParamsTable";
import AddDialog from "components/params/AddDialog";
import EditDialog from "components/params/EditDialog";
export default {
  name: "Params",
  data() {
    return {
      cascaderIds: [],
      parentCates: [],
      cascaderProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      activeName: "many", //many 表示 动态参数  ，only 表示 静态的属性
      manyTableData: [], //动态参数 数据
      onlyTableData: [], //静态参数 数据
      addDialogVisible: false,
      editingId: 0,
      editDialogVisible: false
    };
  },
  computed: {
    isbtnDisabled() {
      //当 级联选择器 选中 第三级 的分类才 等点击添加
      return this.cascaderIds.length !== 3;
    },
    cateId() {
      const length = this.cascaderIds.length;
      if (length !== 3) return null;
      else {
        return this.cascaderIds[length - 1];
      }
    },
    paramsType() {
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    },
    /*正在展示 的 参数类型，传入到 addDialog 里,
      用于 对话框的 渲染，和 添加 参数的请求参数
    */
    showingParams() {
      return {
        id: this.cateId,
        attr_sel: this.activeName
      };
    }
  },
  methods: {
    async _getAllLevelCate() {
      //如果 父级分类 没有获取
      const res = await getAllLevelCate();
      if (res.meta.status !== 200) {
        this.$messsage.error("父级分类列表获取失败");
        return;
      } else {
        this.parentCates = res.data;
      }
    },
    handleChange() {
      if (this.cascaderIds.length !== 3)
         {
           //如果 没有选中第三集 参数， 清空数据 ，退出
           this.manyTableData=[];
           this.onlyTableData=[];
           return ;
         }
      this._getPramas();
    },
    handleClick() {
      this._getPramas();
    },
    async _getPramas() {
      //如果没有 选中第三级 分类 ，就返回
      if (this.cascaderIds.length !== 3) return;

      const res = await getPramas(this.cateId, this.activeName);
      if (res.meta.status !== 200) {
        this.$message.error("参数列表获取失败");
        console.log(res);
      } else {
        console.log(res.data);
        // 保存之前 ，转换 attr_vals 属性 为 数组
        res.data.forEach(value => {
          value.attr_vals = value.attr_vals ? value.attr_vals.split(" ") : [];
           //为 每一个 项 提供 单独的 Visible 和value 值，解决 打开一个全部显示的错误
          value.inputVisible=false;
          value.inputValue='';
        });
        if (this.activeName === "many") {
          this.manyTableData = res.data;
        } else {
          this.onlyTableData = res.data;
        }
      }
    },
    edit(id) {
      this.editingId = id;
      this.editDialogVisible = true;
    },
    async remove(attr_id) {
      const result = await this.$confirm(
        `此操作将永久删除该${this.paramsType},是否继续?`,
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
        const res = await deleteParam(this.cateId, attr_id);
        if (res.meta.status !== 200) {
          this.$message.error("参数删除失败");
        }
        {
          this.$message.success("参数删除成功");
          this._getPramas();
        }
      }
    }
  },
  created() {
    this._getAllLevelCate();
  },
  components: {
    ParamsTable,
    AddDialog,
    EditDialog
  }
};
</script>

<style lang="less" scoped>
.cas-row {
  margin-top: 10px;
}
.params-cas {
  width: 280px;
}
</style>
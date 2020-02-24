<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="addDialogVisible=true"
          >添加分类</el-button>
        </el-col>
      </el-row>
      <!--分类 表格的展示 -->
      <cate-table
        :catelist="catelist"
        @edit="edit"
        @remove="remove"
      ></cate-table>
      <!-- 底部 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3,5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-if="total"
      >
      </el-pagination>

      <add-cate-dialog
        :dialogVisible.sync="addDialogVisible"
        @addSuccess="_getCatelist"
      ></add-cate-dialog>
      <edit-dialog
        :dialogVisible.sync="editDialogVisible"
        :id="edittingId"
        @editSuccess="_getCatelist"
      ></edit-dialog>
    </el-card>
  </div>
</template>

<script>
import { getCatelist ,deleteCate} from "network/goods";
import CateTable from "components/cate/CateTable";
import AddCateDialog from "components/cate/AddCateDialog";
import  EditDialog from 'components/cate/EditDialog'
export default {
  name: "Cate",
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: null,
      catelist: [],
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效"
        },
        {
          label: "排序"
        }
      ],
      addDialogVisible: false,
      editDialogVisible:false,
      edittingId:0
    };
  },
  methods: {
    async _getCatelist() {
      const res = await getCatelist(this.queryInfo);
      console.log(res);

      if (res.meta.status !== 200) {
        this.$message.error("商品分类列表获取失败");
      } else {
        this.catelist = res.data.result;
        this.total = res.data.total;
      }
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      thi._getCatelist();
    },
    handleCurrentChange(newnum) {
      this.queryInfo.pagenum = newnum;
      this._getCatelist();
    },
    // 商品分裂添加成功
    addSuccess(){
      this._getCatelist();
    },
    edit(id)
    { 
      this.edittingId=id;
      this.editDialogVisible=true;
    },
   async remove(id){
      
     const result = await this.$confirm(
        "此操作将永久删除该分类, 是否继续?",
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
        const res = await deleteCate(id);
        if (res.meta.status !== 200) {
          this.$message.error("分类删除失败");
        } else {
          this.$message.success("分类删除成功");
          //重新 获取 角色列表
          this._getCatelist();
        }
      }
    }
  },
  created() {
    this._getCatelist();
  },
  components: {
    CateTable,
    AddCateDialog,
    EditDialog
  }
};
</script>

<style>
</style>
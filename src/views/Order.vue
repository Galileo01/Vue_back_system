<template>
  <div>
    <bread-nav :text="['订单管理','订单列表']"></bread-nav>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            class="search"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <list-table :orderlist="orderlist" @edit="edit" @showpro="showpro"></list-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <edit-dialog :dialogVisible.sync="editDailogVisible"></edit-dialog>
    <progress-dialog :dialogVisible.sync="progressVisible"></progress-dialog>
  </div>
</template>

<script>
import BreadNav from "components/BreadNav";
import { getOrderlist } from "network/order";
import ListTable from "components/order/ListTable";
import EditDialog from 'components/order/EditDialog'
import ProgressDialog from 'components/order/ProgressDialog'
export default {
  name: "Order",
  data() {
    return {
      orderlist: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      editDailogVisible:false,
      progressVisible:false
    };
  },
  methods: {
    async _getOrderlist() {
      const res = await getOrderlist(this.queryInfo);
      if (res.meta.status !== 200) {
        this.$message.error("订单列表获取失败");
        console.log(res);
      } else {
        this.orderlist = res.data.goods;
        this.total = res.data.total;
      }
    },
    handleSizeChange(newsize)
    {
      this.queryInfo.pagesize=newsize;
      this._getOrderlist();
    },
    handleCurrentChange(newpage){
        this.queryInfo.pagenum=newpage;
        this._getOrderlist();
    },
    edit(id)
    {
        this.editDailogVisible=true;
    },
    showpro()
    {
        this.progressVisible=true;
    }

  },
  created() {
    this._getOrderlist();
  },
  components: {
    BreadNav,
    ListTable,
    EditDialog,
    ProgressDialog
  }
};
</script>

<style scoped>
</style>
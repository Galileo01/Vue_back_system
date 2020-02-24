<template>
  <div>
    <bread-nav :text="['商品管理','商品列表']"></bread-nav>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="_getGoodslist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="_getGoodslist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            @click="goAddPage"
          >添加商品</el-button>
        </el-col>

      </el-row>
      <list-table
        :goodslist="goodslist"
        @remove="remove"
      ></list-table>
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
  </div>
</template>

<script>
import BreadNav from "components/BreadNav";
import ListTable from "components/list/ListTable";

import { getGoodslist, removeGood } from "network/goods";

export default {
  name: "List",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      goodslist: [],
      total: 0
    };
  },
  methods: {
    async _getGoodslist() {
      const res = await getGoodslist(this.queryInfo);
      if (res.meta.status !== 200) {
        this.$message.error("商品列表获取失败");
        console.log(res);
      } else {
        this.goodslist = res.data.goods;
        this.total = res.data.total;
      }
    },
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this._getGoodslist();
    },
    handleCurrentChange(newnum) {
      this.queryInfo.pagenum = newnum;
      this._getGoodslist();
    },
    async remove(id) {
      const result = awaitthis
        .$confirm("此操作将永久删除商品, 是否继续?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
        .catch(error => error);

      if (result === "cancel") {
        this.$message.info("取消删除操作");
      } else {
        const res = await removeGood(id);
        if (res.meta.status !== 200) {
          this.$message.error("删除失败");
        } else {
          this.$message.success("删除成功");
          this._getGoodslist();
        }
      }
    },
    goAddPage() {
      this.$router.push("/goods/add");
    },
    async remove(id) {
      const result = await this.$confirm("此操作即将删除该商品", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);

      if (result === "cancel") {
        this.$message.info("取消操作");
      } else {
        const res = await removeGood(id);
        if (res.meta.status !== 200) {
          this.$message.error("删除失败");
        } else {
          this.$message.success("删除成功");
          this._getGoodslist();
        }
      }
    }
  },
  created() {
    this._getGoodslist();
  },

  components: {
    BreadNav,
    ListTable
  }
};
</script>

<style scoped>
.el-icon-search {
  cursor: pointer;
}
</style>
<template>
  <el-table
    :data="goodslist"
    stripe
    border
  >
    <el-table-column type="index"></el-table-column>
    <el-table-column
      label="商品名称"
      prop="goods_name"
      width="700px"
    ></el-table-column>
    <el-table-column
      label="商品价格(元)"
      prop="goods_price"
      width="100px"
    ></el-table-column>
    <el-table-column
      label="商品重量"
      prop="goods_weight"
      width="100px"
    ></el-table-column>
    <el-table-column
      label="创建时间"
    >
    <template v-slot="{row}">
        {{row.add_time|_formatDate}}
        </template></el-table-column>
    <el-table-column label="操作">
        <template v-slot="{row}">
            <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
            <el-button type="danger"  size="mini" icon="el-icon-delete" @click="$emit('remove',row.goods_id)"></el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from "commonjs/utils";
export default {
  name: "ListTable",
  props: {
    goodslist: Array
  },
  filters: {
    _formatDate(str) {
      return formatDate(str,'yyyy-MM-dd hh:mm:ss');
    }
  }
};
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>
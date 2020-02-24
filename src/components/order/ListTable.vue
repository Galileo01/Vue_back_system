<template>
  <el-table :data="orderlist" border stripe>
<el-table-column type="index"></el-table-column>
<el-table-column label="订单编号" prop="order_number" width="680px"></el-table-column>
<el-table-column label="订单价格" prop="order_price" width="80px"></el-table-column>
<el-table-column label="是否付款" prop="order_pay" width="80px">
    <template v-slot="{row}">
        <el-tag type="danger" v-if="row.order_pay==='0'">未支付</el-tag>
        <el-tag type="success" v-else>已支付</el-tag>
    </template>
</el-table-column>
<el-table-column label="是否发货" prop="is_send" width="50px"></el-table-column>
<el-table-column label="下单时间" >
    <template v-slot="{row}">
       {{row.create_time|_formatData}}
    </template>
</el-table-column>
<el-table-column label="操作">
    <template v-slot="{row}">
        <el-button size="mini" icon="el-icon-edit" type="primary" @click="$emit('edit',row.id)"></el-button>
        <el-button size="mini" icon="el-icon-location" type="success" @click="$emit('showpro')"></el-button>
    </template>
</el-table-column>
  </el-table>
</template>

<script>
import {formatDate} from 'commonjs/utils'
export default {
  name:'ListTable',
  props:{
      orderlist:Array
  },
  data(){return {

  }},
  filters:{
      //时间戳 转换
      _formatData(value){
          return formatDate(value,'yyyy-MM-dd hh:mm:ss')
      }
  }
}
</script>

<style>

</style>
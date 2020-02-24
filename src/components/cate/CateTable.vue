<template>
  <tree-table
    :data="catelist"
    v-if="catelist.length!==0"
    :columns="columns"
    :selection-type="false"
    :expand-type="false"
    border
    show-index
    index-text=" "
    :show-row-hover="false"
  >
    <template v-slot:valid="{row}">
        <el-icon class="el-icon-success" v-if="row.cat_deleted===false" style="color:lightgreen"></el-icon>
        <el-icon class="el-icon-error" v-else style="color:red"></el-icon>
    </template>

    <template v-slot:sort="{row}"
    >
    <el-tag size="mini" type="primary" v-if="row.cat_level===0">一级</el-tag>
    <el-tag size="mini" type="danger" v-else-if="row.cat_level===0">二级</el-tag>
    <el-tag size="mini" type="warning" v-else>三级</el-tag>
    </template>

    <template v-slot:opt="{row}">
      <el-button icon="el-icon-edit"  type="primary" size="mini" @click="$emit('edit',row.cat_id)">编辑</el-button>
      <el-button icon="el-icon-delete" type="danger" size="mini" @click="$emit('remove',row.cat_id)">删除</el-button>
    </template>
  </tree-table>
</template>

<script>
export default {
  name: "CateTable",
  props: {
    catelist: Array
  },
  data() {
    return {
      columns: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          //表示 这一栏，会用template 模板渲染
          type: "template",
          //表示 这一列内  使用的 作用域插槽名称
          template: "valid"
        },
        {
          label: "排序",
          type: "template",
          //表示 这一列内  使用的 作用域插槽名称
          template: "sort"
        },
        {
          label: "操作",
          type: "template",
          //表示 这一列内  使用的 作用域插槽名称
          template: "opt"
        }
      ]
    };
  },
  methods:{
    
  }
};
</script>

<style scoped>
.zk-table {
  margin-top: 10px;
}
</style>
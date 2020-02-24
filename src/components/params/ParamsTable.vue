<template>
  <el-table
    stripe
    border
    :data="tableData"
  >
    <!--扩展行-->
    <el-table-column type="expand">
      <template v-slot="{row}">
        <el-tag
          v-for="(item,index) in row.attr_vals"
          :key="index"
          closable
          @close="closeHandler(row,index)"
        >
          {{item}}
        </el-tag>
        <!-- 动态 添加 tag 标签 -->
        <el-input
          class="input-new-tag"
          v-if="row.inputVisible"
          v-model="row.inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm(row)"
        
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="small"
          @click="showInput(row)"
        >+ New Tag</el-button>
      </template>
    </el-table-column>
    <!-- 下标列-->
    <el-table-column type="index"></el-table-column>
    <el-table-column
      :label="labelText"
      prop="attr_name"
    ></el-table-column>
    <el-table-column label="操作">
      <template v-slot="{row}">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="$emit('edit',row.attr_id)"
        >编辑</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          @click="$emit('remove',row.attr_id)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { uploadParamEdit } from "network/goods.js";
export default {
  name: "ParamsTable",
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  },
  props: {
    tableData: Array,
    type: String
  },
  computed: {
    // 参数 类型 的字符串，用于
    labelText() {
      if (this.type === "many") {
        return "参数名称";
      } else {
        return "属性名称";
      }
    },
    //根据 传入的 tableData 得到 当前的 分类id
    cat_id() {
      return this.tableData[0].cat_id;
    }
  },
  methods: {
    handleInputConfirm(row) {
      row.inputVisible = false;
      //使用 trim 去除 两端的 空白字符
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        return ;
      } else {
        row.attr_vals.push(row.inputValue);
        this._uploadParamEdit(row);
        row.inputValue = "";
      }
    },
    showInput(row) {
      row.inputVisible = true;
      // input 渲染完成后 就获取焦点
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //在 删除/ 添加 参数数据项之后， 提交到 服务器
    async _uploadParamEdit(row) {
      const res = await uploadParamEdit(this.cat_id, row.attr_id, {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.attr_vals.join(" ") // 将 数组 还原成 字符串
      });
      if (res.meta.status !== 200) {
        this.$message.error("参数项修改失败");
      } else {
        this.$message.success("参数项修改成功");
      }
    },
    closeHandler(row, i) {
      row.attr_vals.splice(i, 1);
      this._uploadParamEdit(row);
    }
  }
};
</script>

<style scoped>
.el-tag {
  margin: 2px 7px;
}
.input-new-tag {
  width: 120px;
}
</style>

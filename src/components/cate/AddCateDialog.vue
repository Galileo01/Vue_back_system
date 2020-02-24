<template>
  <el-dialog
    title="添加分类"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
    @close="closeHandle"
    @open="_getParentCate"
  >
    <el-form
      :model="newCate"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item
        label="商品分类"
        prop="cat_name"
      >
        <el-input v-model="newCate.cat_name"></el-input>
      </el-form-item>
      <el-form-item
        label="父级分类"
        prop="cat_level"
      >
        <el-cascader
          v-model="cascaderIds"
          :options="parentCates"
          :props="cascaderProps"
          @change="handleChange"
          clearable 
          change-on-select
        ></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="_addCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getParentCate ,addCate} from "network/goods.js";
export default {
  name: "AddCateDialog",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      newCate: {
        cat_name: "",
        cat_pid: 0, //父级分类  id
        cat_level: 0 //分类等级
      },
      //表格 验证规则
      formRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },
      // 父级分裂 
      parentCates: {},
      //级联选择器 的渲染 属性
      cascaderProps: {
        
        value:"cat_id",
        label:"cat_name",
        children:'children'
      },
      //级联选择器 选中的 id
      cascaderIds:[]
    };
  },
  created() {},
  methods: {
    async _getParentCate() {
      //如果 父级分类 没有获取
      if (Object.keys(this.parentCates).length === 0) {
        console.log(22);

        const res = await getParentCate();
        if (res.meta.status !== 200) {
          this.$messsage.error("父级分类列表获取失败");
          return;
        } else {
          this.parentCates = res.data;
        }
      }
    },
    closeHandle() {
        //清空 表单数据
        this.newCate = {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0 
      }
    },
    //在选中的 更改 后，保存   newCate 的数据 
    handleChange(){
    
    const length=this.cascaderIds.length;

    if(length!==0)
    {
        this.newCate.cat_pid=this.cascaderIds[length-1];
        this.newCate.cat_level=length;
    }
    else{
        this.newCate.cat_pid=0;
        this.newCate.cat_level=0;
    }
    },
    async _addCate(){
    const res =await addCate(this.newCate);
    if(res.meta.status!==201)
    {
        this.$message.error('商品分类添加失败');
    }
    else{
        this.$message.success('商品分类添加成功');
        this.$emit('addSuccess');
        this.$emit('update:dialogVisible',false);
    }
    }
  }
};
</script>

<style>
</style>
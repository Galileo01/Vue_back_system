<template>
  <el-dialog
    :title="'编辑'+paramsType"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    width="50%"
    @close="closeHandle"
    @open="_getParamsById"
  >
    <el-form
      label-width="120px"
      :model="paramData"
      :rules="formRules"
      ref="form"
    >
      <el-form-item
        :label="paramsType+'名称'"
        prop="attr_name"
      >
        <el-input v-model="paramData.attr_name"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="_uploadParamEdit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getParamsById ,uploadParamEdit} from "network/goods";
export default {
  name: "EditDialog",
  props: {
    dialogVisible: Boolean,
    showingParams: Object,
    id: Number //参数 id
  },
  data() {
    return {
      paramData: {
        attr_name: ""
      },
      formRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    paramsType() {
      if (this.showingParams.attr_sel === "many") {
        return "动态参数";
      } else {
        return "静态属性";
      }
    },
    //MARK:  将 newParams （描述正在 添加 的参数数据） 设置到 计算属性， 会根据props 的变化 而 变化
    newParam() {
      return {
        ...this.showingParams, // 扩展 传入的showingParams 的所有属性
        attr_name: ""
      };
    }
  },
  methods: {
    closeHandle() {
      this.$refs.form.resetFields();
    },
    async _getParamsById() {
      const res = await getParamsById(
        this.showingParams.id,
        this.id,
        this.showingParams.attr_sel
      );
      if(res.meta.status!==200)
      {
        this.$message.error('参数数据获取失败');
        console.log(res);
        
        this.$emit('update:dialogVisible',false);
      }
      else{
         this.paramData=res.data;
      }
    },
    _uploadParamEdit(){
      this.$refs.form.validate(async valid=>{
        if(!valid)
        return ;
        
      const res=await uploadParamEdit(this.showingParams.id,
        this.id,{
          attr_name:this.paramData.attr_name,
          attr_sel:this.paramData.attr_sel,
          attr_vals:this.paramData.attr_vals
        });

        if(res.meta.status!==200)
        {
          this.$message.error(`${this.paramsType}编辑失败`);
          console.log(res);
          
        }
        else{
          this.$message.success(`${this.paramsType}编辑成功`)
        }
        this.$emit('update:dialogVisible',false);
        this.$emit('editSuccess');
      })
    }
  }
};
</script>

<style>
</style>
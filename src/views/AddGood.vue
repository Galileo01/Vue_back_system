<template>
  <div class="add-good">
    <bread-nav :text="['商品管理','商品列表','添加商品']"></bread-nav>

    <el-card>
      <el-alert
        title="添加商品"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-steps
        :active="+stepIndex"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addInfo"
        :rules="addRules"
        label-position="top"
        label-width="100px"
        ref="addform"
      >
        <el-tabs
          tab-position="left"
          v-model="stepIndex"
          :before-leave="beforeLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane
            label="基本信息"
            name="0"
          >
            <el-form-item
              prop="goods_name"
              label="商品名称"
            >
              <el-input v-model="addInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              prop="goods_price"
              label="商品价格"
            >
              <el-input v-model="addInfo.goods_price"></el-input>
            </el-form-item>
            <el-form-item
              prop="goods_weight"
              label="商品重量"
            >
              <el-input v-model="addInfo.goods_weight"></el-input>
            </el-form-item>
            <el-form-item
              prop="goods_number"
              label="商品数量"
            >
              <el-input v-model="addInfo.goods_number"></el-input>
            </el-form-item>
            <el-form-item>
              <el-cascader
                v-model="addInfo.goods_cat"
                :options="catelist"
                :props="cascaderProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="商品参数"
            name="1"
          >
            <el-form-item
              v-for="(item) in manyData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item2"
                  v-for="(item2) in item.attr_vals"
                  :key="item2.attr_id"
                  border
                ></el-checkbox>

              </el-checkbox-group>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane
            label="商品属性"
            name="2"
          >
            <el-form-item
              :label="item.attr_name"
              v-for="(item) in onlyData"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>

          </el-tab-pane>
          <el-tab-pane
            label="商品图片"
            name="3"
          >
            <el-upload
              :action="uploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :headers="headers"
              list-type="picture"
              :on-success="handleSuccess"
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>

            </el-upload>
          </el-tab-pane>
          <el-tab-pane
            label="商品内容"
            name="4"
          >
          <!--富文本编辑器-->
          <quill-editor class="editor" v-model="addInfo.goods_introduce"></quill-editor>
          <el-button type="primary" @click="uploadGood">添加商品</el-button></el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <img-preview :dialogVisible.sync="previewVisible" :url="previewUrl"></img-preview>

  </div>
</template>

<script>
import BreadNav from "components/BreadNav";
import { getAllLevelCate, getPramas ,addGood} from "network/goods";
import ImgPreview from 'components/add_good/ImgPreview'
import {clone} from 'commonjs/utils'
export default {
  name: "AddGood",
  data() {
    return {
      stepIndex: "0",
      /*NOTE:  使 tabs 的切换可以影响 steps 组件的切换
   
      绑定到    step active 属性 时 需要隐式转换 
      */
      addInfo: {
        goods_name: "",
        goods_cat: [],//所属分类 每一层及的 id 数组
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        pics: [],
        goods_introduce:''
      },
      addRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请输入商品分类", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入重量", trigger: "blur" }
        ]
      },
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover"
      },
      catelist: [], //分类 列表
      manyData: [],
      onlyData: [],
      uploadUrl: "https://www.liulongbin.top:8888/api/private/v1/upload",
      //图片 上传 携带的 token
      headers: {
        Authorization: sessionStorage.getItem("token")
      },
      previewVisible:false,
      previewUrl:''
    };
  },
  computed: {
    cat_id() {
      const length = this.addInfo.goods_cat.length;
      if (length !== 3) return null;
      else {
        return this.addInfo.goods_cat[length - 1];
      }
    }
  },
  methods: {
    async _getAllLevelCate() {
      const res = await getAllLevelCate();
      if (res.meta.status !== 200) {
        this.$message.error("分类列表获取失败");
      } else {
        this.catelist = res.data;
      }
    },
    //根据sel 请求 动态参数 和静态属性
    async _getPramas(sel) {
      const res = await getPramas(this.cat_id, sel);
     
      if (res.meta.status !== 200) {
        this.$message.error(`对应分类的${sel}请求失败`);
      } else {
        if (sel === "many") {
          // 将 attr_vals 转换为 数组
          res.data.forEach(value => {
            value.attr_vals = value.attr_vals ? value.attr_vals.split(" ") : [];
          });
          this.manyData = res.data;
        } else {
          this.onlyData = res.data;
        }
      }
    },
    //处理 级联选择器 的选中改变事件
    handleChange() {
      if (this.addInfo.goods_cat.length !== 3) {
        this.addInfo.goods_cat= [];
      }
    },
    // 组织 从基本信息 tab 跳转出去时，分类没有填写
    beforeLeave(newName, oldName) {
      if (oldName === "0" && this.addInfo.goods_cat.length !== 3) {
        this.$message.warning("请选择分类");

        return false;
      }
    },
    // tab 的选中事件
    tabClick() {
      console.log(this.stepIndex);

      if (this.stepIndex === "1") {
        this._getPramas("many");
      } else if (this.stepIndex === "2") {
        this._getPramas("only");
      }
    },
    //图片 预览处理函数
    handlePreview(file) {
      this.previewUrl=file.response.data.url;
      this.previewVisible=true;
    },
    //图片从 列表 移除处理函数 ,
    handleRemove(file) {
      //将 对应的 路径对象，从pics 移除
      console.log(file);
      const filePath = file.response.data.tmp_path;
      const index = this.addInfo.pics.findIndex(
        value => value.pics === filePath
      );
   this.addInfo.pics.splice(index,1);
   console.log(this.addInfo);
   
    },
    //长传成功处理函数
    handleSuccess(response) {
      //将 上传 返回的 临时路径 保存到pics
      this.addInfo.pics.push({
        pic: response.data.tmp_path
      });
    },
    uploadGood(){
       this.$refs.addform.validate( async valid=>{
         if(!valid)
         {
           this.$message.error('请填写必要的表单');
           return ;
         }
         else{
           //深度 克隆
          const formCloned =clone({},this.addInfo);
          formCloned.attrs=[];
          //处理 goods_cat属性 为字符串
          formCloned.goods_cat=formCloned.goods_cat.join(',');
           formCloned.cat_id=this.cat_id+'';//和视频 教程的api 不一致
         //处理 many 数据
          this.manyData.forEach(value=>{
            const temp ={
              attr_id:value.attr_id,
              attr_value:value.attr_vals.join(' ')
            };
            formCloned.attrs.push(temp);
          });
        //处理 only 数据
        this.onlyData.forEach(value=>{
          const temp={
            attr_id:value.attr_id,
            attr_value:value.attr_vals
          };
          formCloned.attrs.push(temp);
        });
          console.log(formCloned);
          const res= await addGood(formCloned);
          if(res.meta.status!==201)
          {
            this.$message.error('商品添加失败，请重试');
            console.log(res);
            
          }
          else{
            this.$message.success('商品添加成功');
            this.$refs.addform.resetFields();//清空表单
            this.$router.push('/goods');
          }
         
         }
       })
    }
  },
  created() {
    this._getAllLevelCate();
   
  },
  components: {
    BreadNav,
    ImgPreview
  }
};
</script>

<style scoped>
.el-steps >>> div {
  font-size: 13px;
}
.el-tabs {
  margin-top: 20px;
}
.el-cascader {
  width: 280px;
}
.el-checkbox {
  margin: 0 10px 0 0;
}
.add-good /deep/ .ql-editor{
  min-height: 300px;
}
.el-button{
  margin-top: 20px;
}
</style>
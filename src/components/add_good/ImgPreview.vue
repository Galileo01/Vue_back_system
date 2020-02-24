<template>
  <el-dialog
    title="图片预览"
    width="50%"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
  >
    <img
      :src="url"
      alt=""
      class="img-preview"
    >
  </el-dialog>
</template>

<script>
export default {
  name: "ImgPreview",
  props: {
    dialogVisible: Boolean,
    url: String
  }
};
</script>

<style>
.img-preview{
    width: 100%;
}
</style>
<template>
  <el-dialog
    title="物流进度"
    :visible="dialogVisible"
    @update:visible="$emit('update:dialogVisible',false)"
    @open="_getProgress"
  >
<el-timeline >
    <el-timeline-item
      v-for="(activity, index) in progressData"
      :key="index"
      :timestamp="activity.time">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>
  </el-dialog>
</template>

<script>
import { getProgress } from "network/order";
export default {
  name: "ProgressDialog",
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      progressData: []
    };
  },
  methods: {
    async _getProgress() {
      const res = await getProgress();
      if(res.meta.status!==200)
      {
          console.log(res);
          this.$message.error('物流进度获取失败');
          
      }else{
          this.progressData=res.data;
      }
    }
  }
};
</script>

<style>
</style>
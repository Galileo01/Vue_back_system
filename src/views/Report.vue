<template>
  <div>
      <bread-nav :text="['数据统计','数据报表']"></bread-nav>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div
      id="chart"
      style="width:600px;height:400px;"
    ></div>
  </div>
</template>

<script>
import echarts from "echarts";// 引入echarts 
import { getEchartData } from "network/report";
import merge from "lodash.merge";
import BreadNav from 'components/BreadNav'
export default {
  name: "Report",
  data() {
    return {
      option: {}
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const mycharts = echarts.init(document.querySelector("#chart"));
    // 指定图表的配置项和数据

    // 使用刚指定的配置项和数据显示图表。
    this._getEchartData(mycharts);
   
  },
  methods: {
    async _getEchartData(mycharts) {
      const res = await getEchartData();
      if (res.meta.status !== 200) {
        this.$message.error("图表数据获取失败");
      } else {
        const option = {
          title: {
            text: "用户来源"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#E9EEF3"
              }
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ]
        };
        const merged2 = merge(res.data, option);
        this.option = merged2;
         mycharts.setOption(this.option);
        
      }
    }
  },
  components:{
      BreadNav
  }
};
</script>

<style>
</style>
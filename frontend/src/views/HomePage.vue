<!-- HomePage.vue -->

<template>
  <div class="container">
    <FileUpload :on-upload-success="handleUploadSuccess" />

    <div class="chart-container" v-if="chartData">
      <ChartData :chart-data="chartData" :chart-options="chartOptions" v-if="chartData" />
    </div>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload.vue";
import ChartData from "@/components/ChartData.vue";
import { convertMetricInChart } from "@/utils/convertMetricInChart";

export default {
  components: {
    FileUpload,
    ChartData,
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
      },
    };
  },

  methods: {
    handleUploadSuccess(data) {
      const dataMetrics = data.metrics;
      const dataChart = convertMetricInChart(dataMetrics);
      this.chartData = dataChart;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
}
.chart-container {
  width: 50vw;
  height: 60vh;
}
</style>

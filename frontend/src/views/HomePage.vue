<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <FileUpload :on-start-upload="startUpload" :on-upload-success="handleUploadSuccess" />
        <v-card v-if="chartData">
          <ChartData :chart-data="chartData" :chart-options="chartOptions" v-if="chartData" />
        </v-card>
        <v-skeleton-loader
          :elevation="1"
          type="card"
          v-if="loading && !chartData"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
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
        scales: {},
        tooltip: {},
      },
      loading: false,
    };
  },

  methods: {
    startUpload() {
      this.loading = true;
    },
    handleUploadSuccess(data) {
      const dataMetrics = data.metrics;
      const dataChart = convertMetricInChart(dataMetrics);
      this.chartData = dataChart;
    },
  },
};
</script>

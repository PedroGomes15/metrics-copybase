<template>
  <div class="chart-container">
    <div class="legend-buttons">
      <LegendButton
        v-for="(buttonData, index) in chartData"
        :key="index"
        :buttonText="buttonData.datasets[0].label"
        :iconColor="buttonData.datasets[0].backgroundColor"
        :disabled="index === activeButtonIndex"
        @button-clicked="handleButtonClick(index)"
      ></LegendButton>
    </div>
    <Line id="line-main-chart" :options="chartOptions" :data="currentChartData" />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import LegendButton from "./LegendButton.vue";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export default {
  name: "LineChart",
  components: { Line, LegendButton },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentChartData: this.chartData[0],
      activeButtonIndex: 0,
    };
  },
  watch: {
    chartData: {
      handler() {
        this.currentChartData = this.chartData[0];
        this.activeButtonIndex = 0;
      },
      deep: true,
    },
  },
  methods: {
    handleButtonClick(index) {
      this.currentChartData = this.chartData[index];
      this.activeButtonIndex = index;
    },
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 400px;
  width: 100%;
  margin: 20px;
}
.legend-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
</style>

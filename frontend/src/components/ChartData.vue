<template>
  <v-card title="Chart Metrics" fluid>
    <v-col class="fill-height">
      <v-row style="height: 40vh" no-gutters>
        <Line id="line-main-chart" :options="currentChartOptions" :data="currentChartData" />
      </v-row>
      <v-row align="center" justify="center">
        <LegendButton
          v-for="(buttonData, index) in chartData"
          :key="index"
          :buttonText="buttonData.datasets[0].label"
          :iconColor="buttonData.datasets[0].backgroundColor"
          :disabled="index === activeButtonIndex"
          @button-clicked="handleButtonClick(index)"
        ></LegendButton>
      </v-row>
    </v-col>
  </v-card>
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

const chartPercentOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        callback: (value) => `${value}%`, // Formatação do eixo Y para porcentagem
      },
    },
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.formattedValue}%`, // Formatação do tooltip
    },
  },
};

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
      currentChartOptions: this.chartOptions,
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
      if (this.currentChartData.formatType === "percent") {
        this.currentChartOptions = chartPercentOptions;
      } else {
        this.currentChartOptions = this.chartOptions;
      }
    },
  },
};
</script>

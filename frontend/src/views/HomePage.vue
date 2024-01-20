<!-- HomePage.vue -->

<template>
  <div>
    <FileUpload @upload-success="handleUploadSuccess" />
    <button @click="simulateUpload">Simular Upload</button>

    <ChartData :chart-data="chartData" :chart-options="chartOptions" v-if="chartData" />
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload.vue";
import ChartData from "@/components/ChartData.vue";

export default {
  components: {
    FileUpload,
    ChartData,
  },
  data() {
    return {
      chartData: null,
      chartOptions: null,
    };
  },

  methods: {
    handleUploadSuccess() {
      this.chartData = {
        labels: ["Pedro", "Cachorro", "batata"],
        datasets: [{ data: [40, 20, 12] }],
      };
    },
    simulateUpload() {
      // Simula um upload chamando a função handleUploadSuccess
      this.handleUploadSuccess();
    },
  },
};
</script>

<style scoped>
/* Seu estilo aqui, se necessário */
</style>

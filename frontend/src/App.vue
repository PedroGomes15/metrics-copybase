<template>
  <v-app>
    <v-main>
      <HomePage />
    </v-main>
  </v-app>
</template>

<script>
import HomePage from "@/views/HomePage.vue";

export default {
  name: "App",
  components: { HomePage },
  mounted() {
    document.title = "Pedro Gomes - copybase";
  },
};
</script>

<template>
  <v-btn :disabled="disabled" @click="handleClick" class="custom-btn">
    <v-icon :style="{ color: iconColor }" class="mr-2">mdi-chart-line</v-icon>
    <span :class="{ 'bold-text': disabled }">{{ buttonText }}</span>
  </v-btn>
</template>

<script>
export default {
  name: "LegendButton",
  props: {
    buttonText: String,
    iconColor: String,
    disabled: Boolean,
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit("button-clicked");
      }
    },
  },
};
</script>

<style scoped>
.custom-btn {
  margin: 8px; /* Adicione a margem desejada */
}
.bold-text {
  font-weight: bold;
}
</style>

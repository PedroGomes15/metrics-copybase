<template>
  <button :class="{ 'button-disabled': disabled }" @click="handleClick">
    <div class="icon" :style="{ backgroundColor: iconColor }"></div>
    <span :class="{ 'bold-text': disabled }">{{ buttonText }}</span>
  </button>
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
button {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 2px solid black;
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-disabled .icon {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.button-disabled .bold-text {
  font-weight: bold;
}
</style>

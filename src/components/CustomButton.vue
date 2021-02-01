<template>
  <button :style="{ margin }" @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    margin: {
      type: String,
      default: "0"
    }
  },
  methods: {
    onClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 8px 36px;
  font-weight: bold;
  border: 2px solid #e7e7e7;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
</style>

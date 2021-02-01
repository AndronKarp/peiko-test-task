<template>
  <button @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: "CustomButton"
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

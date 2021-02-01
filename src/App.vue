<template>
  <div id="app">
    <custom-button margin="0 0 20px" @click="getData" @click.once="onFirstClick">
      Get data
    </custom-button>
    <div v-if="isLoadedOnce">
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="isError">No data</span>
      <CustomTable width="400px" :items="items" v-else />
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton";
import CustomTable from "@/components/CustomTable";

import { payload } from "@/mocData";

import getData from "@/plugins/getDataFunc";

import { roundToHundreths, calculateChange } from "@/utils";

export default {
  name: "App",
  components: {
    CustomButton,
    CustomTable
  },
  data() {
    return {
      items: [],
      isLoadedOnce: false,
      isLoading: false,
      isError: false
    };
  },
  methods: {
    getData() {
      this.isError = false;
      this.isLoading = true;
      getData(payload)
        .then(this.processData)
        .catch(() => (this.isError = true))
        .finally(() => (this.isLoading = false));
    },
    processData({ stocks, current, start }) {
      this.items = Array(stocks.length)
        .fill()
        .map((item, index) => ({
          stock: stocks[index],
          current: roundToHundreths(current[index]),
          change: calculateChange(current[index], start[index])
        }));
    },
    onFirstClick() {
      this.isLoadedOnce = true;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

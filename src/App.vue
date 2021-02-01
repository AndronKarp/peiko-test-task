<template>
  <div id="app">
    <custom-button class="button" @click="getData" @click.once="onFirstClick">
      Get data
    </custom-button>
    <div v-if="isLoadedOnce">
      <span v-if="isLoading">Loading...</span>
      <span v-else-if="isError">No data</span>
      <div class="table-wrapper" v-else>
        <CustomTable :items="items" />
      </div>
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
    async getData() {
      this.isError = false;
      this.isLoading = true;
      try {
        const data = await getData(payload);
        this.processData(data);
      } catch (e) {
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
    processData({ stocks, current, start }) {
      for (let i = 0; i < stocks.length; i++) {
        this.$set(this.items, i, {
          stock: stocks[i],
          current: roundToHundreths(current[i]),
          change: calculateChange(current[i], start[i])
        });
      }
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

  .button {
    margin-bottom: 20px;
  }

  .table-wrapper {
    width: 400px;
  }
}
</style>

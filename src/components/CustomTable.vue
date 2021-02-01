<template>
  <div class="table" :style="{ width }">
    <div class="table__head">
      <div class="table__row">
        <div v-for="column in columns" :key="column" class="table__col">
          {{ column }}
        </div>
      </div>
    </div>
    <div class="table__body">
      <div v-for="item in sortedItems" :key="item.stock" class="table__row">
        <div
          v-for="value in Object.values(item)"
          :key="value"
          class="table__col"
          :class="colTextModifier(value)"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalize } from "@/utils";

export default {
  name: "CustomTable",
  props: {
    width: {
        type: String,
        default: "100%"
    },
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    columns() {
      return Object.keys(this.items[0]).map(capitalize);
    },
    sortedItems() {
      const { items } = this;
      return items.sort((a, b) => (a.stock > b.stock ? 1 : -1));
    },
    colTextModifier() {
      return text =>
        ({
          "+": "table__col_green-text",
          "-": "table__col_red-text"
        }[text.charAt()]);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  &__row {
    display: flex;
    border: 2px solid #e7e7e7;
    border-radius: 2px;
  }

  &__col {
    flex: 1;
    padding: 12px;
    text-align: center;

    &:first-child {
      text-align: start;
    }

    &:last-child {
      text-align: end;
    }

    &_red-text {
      color: #fa8072;
    }

    &_green-text {
      color: #9acd32;
    }
  }

  &__head {
    .table__row {
      font-weight: bold;
      background-color: #efefef;
    }
  }

  &__body {
    .table__row {
      border-top: none;
    }
  }
}
</style>

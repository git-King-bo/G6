<template>
  <div>
    <div style="margin: 16px">
      <a-button
        type="primary"
        :loading="loading"
        @click="start"
        class="at-item"
      >
        Reload
      </a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{ `Selected ${selectedRowKeys.length} items` }}
        </template>
      </span>
    </div>
    <a-table
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      :data-source="data"
    />
  </div>
</template>
<script>
const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}

export default {
  data() {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false
    };
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    start() {
      this.loading = true;
      // ajax request after empty completing
      this.$router.push({ path: "/Gsix" });
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      console.log("selectedRowKeys changed: ", selectedRowKeys, selectionRows);
      this.selectedRowKeys = selectedRowKeys;
    }
  }
};
</script>
<style>
.at-item {
  transition: 1s;
}
.at-item:hover {
  /* animation-name: shadow-pop-bottom;
  animation-duration: 1s; */
  transform: translateZ(50px) translateY(-12px);
  /* box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35); */
  box-shadow: 0px 22px 22px -12px rgb(55 50 50 / 88%);
  /* shorthand 
  animation: shadow-pop-bottom 1s ease 0s 1 normal none;
  */
}
@keyframes shadow-pop-bottom {
  0% {
    transform: translateZ(0) translateY(0);
    box-shadow: 0 0 0 0 transparent;
  }
  100% {
    transform: translateZ(50px) translateY(-12px);
    box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35);
  }
}
</style>

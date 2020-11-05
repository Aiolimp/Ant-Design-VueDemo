<template>
  <div class="page_pagination">
    <a-config-provider :locale="zhCN">
      <a-pagination
        :showQuickJumper="true"
        showSizeChanger
        :total="parentPager.totalRecord"
        @change="onChange"
        :pageSize="parentPager.pageSize"
        :defaultPageSize="5"
        @showSizeChange="onShowSizeChange"
        :pageSizeOptions="parentPager.pageSizeOptions"
        :showTotal="(total) => showTotal(total)"
      >
      </a-pagination>
    </a-config-provider>
  </div>
</template>
<script>
import zhCN from "ant-design-vue/es/locale-provider/zh_CN";
export default {
  props: {
    parentPager: {
      type: Object,
    },
  },
  data() {
    return {
      zhCN,
    };
  },
  mounted() {},
  methods: {
    showTotal(total) {
      return `共有 ${this.parentPager.totalRecord} 条`;
    },
    onChange(currentPage, pageSize) {
      console.log(currentPage, pageSize);
      this.$emit("paginationChange", currentPage, pageSize);
    },
    onShowSizeChange(currentPage, pageSize) {
      this.$emit("paginationChange", currentPage, pageSize);
    },
  },
};
</script>
<style lang="less" scoped>
</style>

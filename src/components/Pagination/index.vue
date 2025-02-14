<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <a-pagination
      v-bind="$attrs"
      :show-quick-jumper="true"
      :show-size-changer="true"
      :current="currentPage"
      :page-size="pageSize"
      :total="total"
      :page-size-options="pageSizes"
      :show-total="(total) => `Total ${total} items`"
      @show-size-change="handleSizeChange"
      @change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { scrollTo } from '@/utils/scroll-to';

export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:page', 'update:limit', 'pagination'],
  setup(props, { emit }) {
    const currentPage = computed({
      get() {
        return props.page;
      },
      set(val) {
        emit('update:page', val);
      },
    });

    const pageSize = computed({
      get() {
        return props.limit;
      },
      set(val) {
        emit('update:limit', val);
      },
    });

    const handleSizeChange = (current, size) => {
      emit('pagination', { page: current, limit: size });
      if (props.autoScroll) {
        scrollTo(0, 800);
      }
    };

    const handleCurrentChange = (current) => {
      emit('pagination', { page: current, limit: props.limit });
      if (props.autoScroll) {
        scrollTo(0, 800);
      }
    };

    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
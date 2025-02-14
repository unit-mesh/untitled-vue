<template>
  <a-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class="size-icon" icon-class="size" />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item
          v-for="item of sizeOptions"
          :key="item.value"
          :disabled="size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import SvgIcon from '../SvgIcon/index.vue';

export default defineComponent({
  components: {
    SvgIcon,
  },
  setup() {
    const store = useStore();

    const sizeOptions = [
      { label: 'Default', value: 'default' },
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Mini', value: 'mini' },
    ];

    const size = computed(() => store.getters.size);

    const handleSetSize = (size) => {
      store.dispatch('app/setSize', size);
      refreshView();
      message.success('Switch Size Success');
    };

    const refreshView = () => {
      store.dispatch('tagsView/delAllCachedViews', store.state.route);

      const { fullPath } = store.state.route;

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    };

    return {
      sizeOptions,
      size,
      handleSetSize,
      refreshView,
    };
  },
});
</script>
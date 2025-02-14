<template>
  <div :style="{ height: height + 'px', zIndex: zIndex }">
    <div
      :class="className"
      :style="{
        top: isSticky ? stickyTop + 'px' : '',
        zIndex: zIndex,
        position: position,
        width: width,
        height: height + 'px',
      }"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, onActivated } from 'vue';

export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const active = ref(false);
    const position = ref('');
    const width = ref(undefined);
    const height = ref(undefined);
    const isSticky = ref(false);

    const sticky = () => {
      if (active.value) {
        return;
      }
      position.value = 'fixed';
      active.value = true;
      width.value = width.value + 'px';
      isSticky.value = true;
    };

    const reset = () => {
      position.value = '';
      width.value = 'auto';
      active.value = false;
      isSticky.value = false;
    };

    const handleScroll = () => {
      const el = this.$el;
      const widthValue = el.getBoundingClientRect().width;
      width.value = widthValue || 'auto';
      const offsetTop = el.getBoundingClientRect().top;
      if (offsetTop < props.stickyTop) {
        sticky();
        return;
      }
      reset();
    };

    const handleResize = () => {
      if (isSticky.value) {
        width.value = this.$el.getBoundingClientRect().width + 'px';
      }
    };

    onMounted(() => {
      height.value = this.$el.getBoundingClientRect().height;
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    });

    onActivated(() => {
      handleScroll();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    });

    return {
      active,
      position,
      width,
      height,
      isSticky,
      sticky,
      reset,
      handleScroll,
      handleResize,
    };
  },
};
</script>
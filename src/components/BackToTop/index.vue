<template>
  <transition :name="transitionName">
    <div
      v-show="visible"
      :style="customStyle"
      class="back-to-ceiling"
      @click="backToTop"
    >
      <a-icon type="up" class="icon" />
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'BackToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 400,
    },
    backPosition: {
      type: Number,
      default: 0,
    },
    customStyle: {
      type: Object,
      default: () => ({
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '40px',
        background: '#e7eaf1',
      }),
    },
    transitionName: {
      type: String,
      default: 'fade',
    },
  },
  setup(props) {
    const visible = ref(false);
    const interval = ref(null);
    const isMoving = ref(false);

    const handleScroll = () => {
      visible.value = window.pageYOffset > props.visibilityHeight;
    };

    const backToTop = () => {
      if (isMoving.value) return;
      const start = window.pageYOffset;
      let i = 0;
      isMoving.value = true;
      interval.value = setInterval(() => {
        const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500));
        if (next <= props.backPosition) {
          window.scrollTo(0, props.backPosition);
          clearInterval(interval.value);
          isMoving.value = false;
        } else {
          window.scrollTo(0, next);
        }
        i++;
      }, 16.7);
    };

    const easeInOutQuad = (t, b, c, d) => {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
      return (-c / 2) * (--t * (t - 2) - 1) + b;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
      if (interval.value) {
        clearInterval(interval.value);
      }
    });

    return {
      visible,
      interval,
      isMoving,
      handleScroll,
      backToTop,
      easeInOutQuad,
    };
  },
};
</script>

<style scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.back-to-ceiling:hover {
  background: #d5dbe7;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.back-to-ceiling .icon {
  font-size: 16px;
  color: #9aaabf;
}
</style>
<template>
  <div style="padding: 0 15px" @click="toggleClick">
    <a-icon
      :class="{ 'is-active': isActive }"
      class="hamburger"
      type="menu"
      :style="{ fontSize: '64px' }"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggleClick'],
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    },
  },
})
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
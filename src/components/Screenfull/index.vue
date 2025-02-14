<template>
  <div>
    <a-icon
      :type="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"
      @click="click"
    />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import screenfull from 'screenfull'

export default {
  name: 'Screenfull',
  setup() {
    const isFullscreen = ref(false)

    const click = () => {
      if (!screenfull.enabled) {
        alert('Your browser cannot work') // Ant Design Vue 没有直接的 $message 方法，可以用 alert 代替
        return false
      }
      screenfull.toggle()
    }

    const change = () => {
      isFullscreen.value = screenfull.isFullscreen
    }

    const init = () => {
      if (screenfull.enabled) {
        screenfull.on('change', change)
      }
    }

    const destroy = () => {
      if (screenfull.enabled) {
        screenfull.off('change', change)
      }
    }

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      destroy()
    })

    return {
      isFullscreen,
      click,
    }
  },
}
</script>

<style scoped>
.anticon {
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  vertical-align: 10px;
}
</style>
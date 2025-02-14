<template>
  <a-color-picker
    v-model:value="theme"
    :presets="[
      {
        label: 'Predefined Colors',
        colors: [
          '#409EFF',
          '#1890ff',
          '#304156',
          '#212121',
          '#11a983',
          '#13c2c2',
          '#6959CD',
          '#f5222d',
        ],
      },
    ]"
    class="theme-picker"
    :popup-class-name="'theme-picker-dropdown'"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'pinia'
import { message } from 'ant-design-vue'

const ORIGINAL_THEME = '#409EFF' // default color

const store = useStore()
const theme = ref(store.settings.theme)
const chalk = ref('')

watch(
  () => store.settings.theme,
  (newVal) => {
    theme.value = newVal
  },
  { immediate: true }
)

watch(
  theme,
  async (newVal, oldVal) => {
    if (typeof newVal !== 'string') return

    const themeCluster = getThemeCluster(newVal.replace('#', ''))
    const originalCluster = getThemeCluster(
      oldVal ? oldVal.replace('#', '') : ORIGINAL_THEME.replace('#', '')
    )

    const hideMessage = message.loading('Compiling the theme', 0)

    const getHandler = (variable, id) => {
      return () => {
        const originalCluster = getThemeCluster(
          ORIGINAL_THEME.replace('#', '')
        )
        const newStyle = updateStyle(
          chalk.value,
          originalCluster,
          themeCluster
        )

        let styleTag = document.getElementById(id)
        if (!styleTag) {
          styleTag = document.createElement('style')
          styleTag.setAttribute('id', id)
          document.head.appendChild(styleTag)
        }
        styleTag.innerText = newStyle
      }
    }

    if (!chalk.value) {
      const url = `https://unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css`
      await getCSSString(url, 'chalk')
    }

    const chalkHandler = getHandler('chalk', 'chalk-style')

    chalkHandler()

    const styles = Array.from(document.querySelectorAll('style')).filter(
      (style) => {
        const text = style.innerText
        return (
          new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        )
      }
    )
    styles.forEach((style) => {
      const { innerText } = style
      if (typeof innerText !== 'string') return
      style.innerText = updateStyle(innerText, originalCluster, themeCluster)
    })

    hideMessage()
    emit('change', newVal)
  }
)

function updateStyle(style, oldCluster, newCluster) {
  let newStyle = style
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
  })
  return newStyle
}

function getCSSString(url, variable) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        chalk.value = xhr.responseText.replace(/@font-face{[^}]+}/, '')
        resolve()
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}

function getThemeCluster(theme) {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    if (tint === 0) {
      return [red, green, blue].join(',')
    } else {
      red += Math.round(tint * (255 - red))
      green += Math.round(tint * (255 - green))
      blue += Math.round(tint * (255 - blue))

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }
  }

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16)
    let green = parseInt(color.slice(2, 4), 16)
    let blue = parseInt(color.slice(4, 6), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    red = red.toString(16)
    green = green.toString(16)
    blue = blue.toString(16)

    return `#${red}${green}${blue}`
  }

  const clusters = [theme]
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
  }
  clusters.push(shadeColor(theme, 0.1))
  return clusters
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .ant-color-picker-trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
.theme-picker-dropdown .ant-color-picker-dropdown-link-btn {
  display: none;
}
</style>
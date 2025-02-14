<template>
  <div class="json-editor">
    <a-textarea v-model:value="jsonValue" :rows="10" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '../store/index'
import { message } from 'ant-design-vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['changed', 'update:value'])

const store = useStore()
const jsonValue = ref(props.value)

watch(
  () => props.value,
  (newValue) => {
    if (newValue !== jsonValue.value) {
      jsonValue.value = newValue
    }
  }
)

watch(
  () => jsonValue.value,
  (newValue) => {
    emit('changed', newValue)
    emit('update:value', newValue)
    try {
      store.setJsonData(JSON.parse(newValue))
      message.success('JSON data updated successfully')
    } catch (e) {
      message.error('Invalid JSON format')
    }
  }
)
</script>

<style scoped>
.json-editor {
  height: 100%;
  position: relative;
}
</style>
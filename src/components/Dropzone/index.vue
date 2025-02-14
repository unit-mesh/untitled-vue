<template>
  <a-upload
    :action="url"
    :before-upload="beforeUpload"
    :multiple="maxFiles > 1"
    :file-list="fileList"
    :show-upload-list="showRemoveLink"
    :accept="acceptedFiles"
    :max-count="maxFiles"
    @change="handleChange"
    @remove="handleRemove"
  >
    <div :id="id" class="dropzone">
      <p class="ant-upload-drag-icon">
        <span>{{ defaultMsg }}</span>
      </p>
    </div>
  </a-upload>
</template>

<script setup>
import { ref, watch } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  clickable: {
    type: Boolean,
    default: true,
  },
  defaultMsg: {
    type: String,
    default: '上传图片',
  },
  acceptedFiles: {
    type: String,
    default: '',
  },
  thumbnailHeight: {
    type: Number,
    default: 200,
  },
  thumbnailWidth: {
    type: Number,
    default: 200,
  },
  showRemoveLink: {
    type: Boolean,
    default: true,
  },
  maxFilesize: {
    type: Number,
    default: 2,
  },
  maxFiles: {
    type: Number,
    default: 3,
  },
  autoProcessQueue: {
    type: Boolean,
    default: true,
  },
  useCustomDropzoneOptions: {
    type: Boolean,
    default: false,
  },
  defaultImg: {
    default: '',
    type: [String, Array],
  },
  couldPaste: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'dropzone-success',
  'dropzone-fileAdded',
  'dropzone-removedFile',
  'dropzone-error',
  'dropzone-successmultiple',
])

const fileList = ref([])

watch(
  () => props.defaultImg,
  (val) => {
    if (val.length === 0) return
    initImages(val)
  },
  { immediate: true }
)

const initImages = (val) => {
  if (Array.isArray(val)) {
    fileList.value = val.map((url, index) => ({
      uid: `-${index}`,
      name: `name${index}`,
      status: 'done',
      url,
    }))
  } else {
    fileList.value = [
      {
        uid: '-1',
        name: 'name',
        status: 'done',
        url: val,
      },
    ]
  }
}

const beforeUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < props.maxFilesize
  if (!isLt2M) {
    message.error(`文件大小不能超过 ${props.maxFilesize}MB!`)
  }
  return isLt2M
}

const handleChange = (info) => {
  if (info.file.status === 'done') {
    emit('dropzone-success', info.file)
  } else if (info.file.status === 'error') {
    emit('dropzone-error', info.file)
  }
}

const handleRemove = (file) => {
  emit('dropzone-removedFile', file)
}
</script>

<style scoped>
.dropzone {
  border: 2px solid #e5e5e5;
  font-family: 'Roboto', sans-serif;
  color: #777;
  transition: background-color 0.2s linear;
  padding: 5px;
}

.dropzone:hover {
  background-color: #f6f6f6;
}
</style>
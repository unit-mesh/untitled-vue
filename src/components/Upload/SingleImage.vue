<template>
  <div class="upload-container">
    <a-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      name="file"
      action="https://httpbin.org/post"
      @beforeUpload="beforeUpload"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        <div class="a-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </a-button>
    </a-upload>
    <div class="image-preview">
      <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
        <img :src="imageUrl + '?imageView2/1/w/200/h/200'" />
        <div class="image-preview-action">
          <delete-outlined @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Upload as AUpload, Button as AButton } from 'ant-design-vue';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { getToken } from '@/api/qiniu';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:value']);

const tempUrl = ref('');
const dataObj = ref({ token: '', key: '' });

const imageUrl = computed(() => props.value);

const rmImage = () => {
  emit('update:value', '');
};

const emitInput = (val) => {
  emit('update:value', val);
};

const handleImageSuccess = () => {
  emitInput(tempUrl.value);
};

const beforeUpload = () => {
  return new Promise((resolve, reject) => {
    getToken()
      .then((response) => {
        const key = response.data.qiniu_key;
        const token = response.data.qiniu_token;
        dataObj.value.token = token;
        dataObj.value.key = key;
        tempUrl.value = response.data.qiniu_url;
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(false);
      });
  });
};
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 60%;
    float: left;
  }
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .anticon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
}
</style>
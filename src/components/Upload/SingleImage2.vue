<template>
  <div class="singleImageUpload2 upload-container">
    <a-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-change="handleImageSuccess"
      class="image-uploader"
      action="https://httpbin.org/post"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        Drag或<em>点击上传</em>
      </a-button>
    </a-upload>
    <div v-if="imageUrl" class="image-preview">
      <div class="image-preview-wrapper">
        <img :src="imageUrl" />
        <div class="image-preview-action">
          <a-icon type="delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
import { getToken } from '@/api/qiniu';

export default defineComponent({
  name: 'SingleImageUpload2',
  components: {
    UploadOutlined,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const dataObj = ref({ token: '', key: '' });
    const tempUrl = ref('');

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
          .catch(() => {
            reject(false);
          });
      });
    };

    return {
      dataObj,
      imageUrl,
      rmImage,
      handleImageSuccess,
      beforeUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  height: 100%;
  position: relative;
  .image-uploader {
    height: 100%;
  }
  .image-preview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    border: 1px dashed #d9d9d9;
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
<template>
  <div class="upload-container">
    <a-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :before-upload="beforeUpload"
      @change="handleImageSuccess"
      class="image-uploader"
      action="https://httpbin.org/post"
    >
      <a-icon type="upload" />
      <div class="a-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </a-upload>
    <div class="image-preview image-app-preview">
      <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
        <img :src="imageUrl" />
        <div class="image-preview-action">
          <a-icon type="delete" />
        </div>
      </div>
    </div>
    <div class="image-preview">
      <div v-show="imageUrl.length > 1" class="image-preview-wrapper">
        <img :src="imageUrl" />
        <div class="image-preview-action">
          <a-icon type="delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Upload as AUpload, Icon as AIcon } from 'ant-design-vue';
import { getToken } from '@/api/qiniu';

export default {
  components: {
    AUpload,
    AIcon,
  },
  name: 'SingleImageUpload3',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tempUrl: '',
      dataObj: { token: '', key: '' },
    };
  },
  computed: {
    imageUrl() {
      return this.value;
    },
  },
  methods: {
    rmImage() {
      this.$emit('update:value', '');
    },
    emitInput(val) {
      this.$emit('update:value', val);
    },
    handleImageSuccess(info) {
      if (info.file.status === 'done') {
        this.emitInput(info.file.response.files.file);
      }
    },
    beforeUpload() {
      const _self = this;
      return new Promise((resolve, reject) => {
        getToken()
          .then((response) => {
            const key = response.data.qiniu_key;
            const token = response.data.qiniu_token;
            _self.dataObj.token = token;
            _self.dataObj.key = key;
            _self.tempUrl = response.data.qiniu_url;
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(false);
          });
      });
    },
  },
  emits: ['update:value'],
};
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.upload-container {
  width: 100%;
  position: relative;
  @include clearfix;
  .image-uploader {
    width: 35%;
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
      .a-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
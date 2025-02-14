<template>
  <div class="upload-container">
    <a-button
      :style="{ background: color, borderColor: color }"
      :icon="UploadOutlined"
      size="small"
      type="primary"
      @click="dialogVisible = true"
    >
      upload
    </a-button>
    <a-modal v-model:visible="dialogVisible" :footer="null">
      <a-upload
        :multiple="true"
        :file-list="fileList"
        :show-upload-list="true"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <a-button size="small" type="primary"> Click upload </a-button>
      </a-upload>
      <div style="text-align: right; margin-top: 10px;">
        <a-button @click="dialogVisible = false"> Cancel </a-button>
        <a-button type="primary" @click="handleSubmit"> Confirm </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'EditorSlideUpload',
  components: {
    UploadOutlined,
  },
  props: {
    color: {
      type: String,
      default: '#1890ff',
    },
  },
  emits: ['successCBK'],
  setup(props, { emit }) {
    const dialogVisible = ref(false);
    const listObj = ref({});
    const fileList = ref([]);

    const checkAllSuccess = () => {
      return Object.keys(listObj.value).every(
        (item) => listObj.value[item].hasSuccess
      );
    };

    const handleSubmit = () => {
      const arr = Object.keys(listObj.value).map((v) => listObj.value[v]);
      if (!checkAllSuccess()) {
        alert(
          'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
        );
        return;
      }
      emit('successCBK', arr);
      listObj.value = {};
      fileList.value = [];
      dialogVisible.value = false;
    };

    const handleSuccess = (response, file) => {
      const uid = file.uid;
      const objKeyArr = Object.keys(listObj.value);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (listObj.value[objKeyArr[i]].uid === uid) {
          listObj.value[objKeyArr[i]].url = response.files.file;
          listObj.value[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    };

    const handleRemove = (file) => {
      const uid = file.uid;
      const objKeyArr = Object.keys(listObj.value);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (listObj.value[objKeyArr[i]].uid === uid) {
          delete listObj.value[objKeyArr[i]];
          return;
        }
      }
    };

    const beforeUpload = (file) => {
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      listObj.value[fileName] = {};
      return new Promise((resolve) => {
        const img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = () => {
          listObj.value[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: img.width,
            height: img.height,
          };
        };
        resolve(true);
      });
    };

    return {
      dialogVisible,
      listObj,
      fileList,
      UploadOutlined,
      checkAllSuccess,
      handleSubmit,
      handleSuccess,
      handleRemove,
      beforeUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .ant-upload-picture-card-wrapper {
    width: 100%;
  }
}
</style>
<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container"
    :style="{ width: containerWidth }"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, onActivated, onDeactivated } from 'vue';
import editorImage from './components/EditorImage.vue';
import plugins from './plugins';
import toolbar from './toolbar';
import load from './dynamicLoadScript';

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';

const props = defineProps({
  id: {
    type: String,
    default: () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + ''),
  },
  value: {
    type: String,
    default: '',
  },
  toolbar: {
    type: Array,
    required: false,
    default: () => [],
  },
  menubar: {
    type: String,
    default: 'file edit insert view format table',
  },
  height: {
    type: [Number, String],
    required: false,
    default: 360,
  },
  width: {
    type: [Number, String],
    required: false,
    default: 'auto',
  },
});

const emit = defineEmits(['update:value']);

const hasChange = ref(false);
const hasInit = ref(false);
const tinymceId = ref(props.id);
const fullscreen = ref(false);
const languageTypeList = {
  en: 'en',
  zh: 'zh_CN',
  es: 'es_MX',
  ja: 'ja',
};

const containerWidth = computed(() => {
  const width = props.width;
  if (/^[\d]+(\.[\d]+)?$/.test(width)) {
    return `${width}px`;
  }
  return width;
});

watch(() => props.value, (val) => {
  if (!hasChange.value && hasInit.value) {
    nextTick(() => window.tinymce.get(tinymceId.value).setContent(val || ''));
  }
});

onMounted(() => {
  init();
});

onActivated(() => {
  if (window.tinymce) {
    initTinymce();
  }
});

onDeactivated(() => {
  destroyTinymce();
});

onBeforeUnmount(() => {
  destroyTinymce();
});

function init() {
  load(tinymceCDN, (err) => {
    if (err) {
      message.error(err.message);
      return;
    }
    initTinymce();
  });
}

function initTinymce() {
  const _this = this;
  window.tinymce.init({
    selector: `#${tinymceId.value}`,
    language: languageTypeList['en'],
    height: props.height,
    body_class: 'panel-body ',
    object_resizing: false,
    toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
    menubar: props.menubar,
    plugins: plugins,
    end_container_on_empty_block: true,
    powerpaste_word_import: 'clean',
    code_dialog_height: 450,
    code_dialog_width: 1000,
    advlist_bullet_styles: 'square',
    advlist_number_styles: 'default',
    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
    init_instance_callback: (editor) => {
      if (props.value) {
        editor.setContent(props.value);
      }
      hasInit.value = true;
      editor.on('NodeChange Change KeyUp SetContent', () => {
        hasChange.value = true;
        emit('update:value', editor.getContent());
      });
    },
    setup(editor) {
      editor.on('FullscreenStateChanged', (e) => {
        fullscreen.value = e.state;
      });
    },
    convert_urls: false,
  });
}

function destroyTinymce() {
  const tinymce = window.tinymce.get(tinymceId.value);
  if (fullscreen.value) {
    tinymce.execCommand('mceFullScreen');
  }

  if (tinymce) {
    tinymce.destroy();
  }
}

function setContent(value) {
  window.tinymce.get(tinymceId.value).setContent(value);
}

function getContent() {
  return window.tinymce.get(tinymceId.value).getContent();
}

function imageSuccessCBK(arr) {
  arr.forEach((v) =>
    window.tinymce
      .get(tinymceId.value)
      .insertContent(`<img class="wscnph" src="${v.url}" >`)
  );
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
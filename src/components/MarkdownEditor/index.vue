<template>
  <div :id="id" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import 'codemirror/lib/codemirror.css'; // codemirror
import 'tui-editor/dist/tui-editor.css'; // editor ui
import 'tui-editor/dist/tui-editor-contents.css'; // editor content

import Editor from 'tui-editor';
import defaultOptions from './default-options';

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: false,
    default() {
      return (
        'markdown-editor-' +
        +new Date() +
        ((Math.random() * 1000).toFixed(0) + '')
      );
    },
  },
  options: {
    type: Object,
    default() {
      return defaultOptions;
    },
  },
  mode: {
    type: String,
    default: 'markdown',
  },
  height: {
    type: String,
    required: false,
    default: '300px',
  },
  language: {
    type: String,
    required: false,
    default: 'en_US', // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
  },
});

const emit = defineEmits(['update:value']);

const editor = ref(null);

const editorOptions = computed(() => {
  const options = Object.assign({}, defaultOptions, props.options);
  options.initialEditType = props.mode;
  options.height = props.height;
  options.language = props.language;
  return options;
});

watch(() => props.value, (newValue, preValue) => {
  if (newValue !== preValue && newValue !== editor.value.getValue()) {
    editor.value.setValue(newValue);
  }
});

watch(() => props.language, (val) => {
  destroyEditor();
  initEditor();
});

watch(() => props.height, (newValue) => {
  editor.value.height(newValue);
});

watch(() => props.mode, (newValue) => {
  editor.value.changeMode(newValue);
});

onMounted(() => {
  initEditor();
});

onBeforeUnmount(() => {
  destroyEditor();
});

function initEditor() {
  editor.value = new Editor({
    el: document.getElementById(props.id),
    ...editorOptions.value,
  });
  if (props.value) {
    editor.value.setValue(props.value);
  }
  editor.value.on('change', () => {
    emit('update:value', editor.value.getValue());
  });
}

function destroyEditor() {
  if (!editor.value) return;
  editor.value.off('change');
  editor.value.remove();
}

function setValue(value) {
  editor.value.setValue(value);
}

function getValue() {
  return editor.value.getValue();
}

function setHtml(value) {
  editor.value.setHtml(value);
}

function getHtml() {
  return editor.value.getHtml();
}
</script>
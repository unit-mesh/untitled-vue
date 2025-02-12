<template>
  <div class="hello-world">
    <!-- Hamburger 组件 -->
    <Hamburger class="hamburger" @toggleClick="toggleSideBar" />

    <!-- PanThumb 组件，显示用户头像 -->
    <PanThumb class="user-thumb" image="https://picsum.photos/100/100" />

    <!-- ThemePicker 组件，主题切换 -->
<!--    <ThemePicker class="theme-picker" />-->

    <!-- Screenfull 组件，全屏切换 -->
    <Screenfull class="screenfull" />

    <!-- 主内容区域 -->
    <div class="content">
      <dnd-list
        :list1="list1"
        :list2="list2"
        :list1Title="list1Title"
        :list2Title="list2Title"
        :width1="width1"
        :width2="width2">

      </dnd-list>

      <drag-select value="hello">
        <div class="title">Hello World</div>
      </drag-select>

      <MdInput type="text" v-model="hello" placeholder="请输入内容" />

      <MarkdownEditor v-model="hello" />
    </div>

    <!-- 返回顶部按钮 -->
    <BackToTop class="back-to-top" v-show="true" />
  </div>
</template>

<script>
import Hamburger from '../components/Hamburger/index.vue';
import PanThumb from '../components/PanThumb/index.vue';
import Screenfull from '../components/Screenfull/index.vue';
import BackToTop from '../components/BackToTop/index.vue';
import MdInput from '../components/MDinput/index.vue'
import MarkdownEditor from '../components/MarkdownEditor/index.vue'
import ErrorLog from '../components/ErrorLog/index.vue'
import Dropzone from '../components/Dropzone/index.vue'
import DragSelect from '../components/DragSelect/index.vue'
import DndList from '../components/DndList/index.vue'

export default {
  name: 'HelloWorld',
  components: {
    DndList,
    MarkdownEditor,
    MdInput,
    Hamburger,
    PanThumb,
    // ThemePicker,
    Screenfull,
    BackToTop,
    ErrorLog,
    Dropzone,
    DragSelect,
  },
  methods: {
    toggleSideBar() {
      console.log('Toggle sidebar');
    },
  },
};
</script>

<style scoped>
.hello-world {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--bg-color);
}

.hamburger {
  position: absolute;
  top: 20px;
  left: 20px;
}

.user-thumb {
  position: absolute;
  top: 20px;
  right: 20px;
}

.theme-picker {
  position: absolute;
  top: 80px;
  right: 20px;
}

.screenfull {
  position: absolute;
  top: 140px;
  right: 20px;
}

.content {
  text-align: center;
}

.title {
  font-size: 3rem;
  color: var(--text-color);
}

.description {
  font-size: 1.5rem;
  color: var(--text-secondary-color);
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

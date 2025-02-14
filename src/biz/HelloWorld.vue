<template>
  <div class="hello-world">
    <!-- Hamburger 组件 -->
    <Hamburger class="hamburger" @toggleClick="toggleSideBar" />

    <!-- PanThumb 组件，显示用户头像 -->
    <PanThumb class="user-thumb" image="https://picsum.photos/100/100" />

    <!-- Screenfull 组件，全屏切换 -->
    <Screenfull class="screenfull" />

    <!-- 主内容区域 -->
    <div class="content">
      <DndList
        :list1="list1"
        :list2="list2"
        :list1Title="list1Title"
        :list2Title="list2Title"
        :width1="width1"
        :width2="width2"
      />

      <DragSelect v-model:value="hello">
        <div class="title">Hello World</div>
      </DragSelect>

      <a-input v-model:value="hello" placeholder="请输入内容" />

      <MarkdownEditor v-model:value="hello" />
    </div>

    <!-- 返回顶部按钮 -->
    <BackToTop class="back-to-top" v-if="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Hamburger from '../components/Hamburger/index.vue';
import PanThumb from '../components/PanThumb/index.vue';
import Screenfull from '../components/Screenfull/index.vue';
import BackToTop from '../components/BackToTop/index.vue';
import MarkdownEditor from '../components/MarkdownEditor/index.vue';
import DragSelect from '../components/DragSelect/index.vue';
import DndList from '../components/DndList/index.vue';
import { Input as AInput } from 'ant-design-vue';

const hello = ref('Hello World');
const list1 = ref([/* 初始化 list1 数据 */]);
const list2 = ref([/* 初始化 list2 数据 */]);
const list1Title = ref('List 1');
const list2Title = ref('List 2');
const width1 = ref(200);
const width2 = ref(200);

const toggleSideBar = () => {
  console.log('Toggle sidebar');
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
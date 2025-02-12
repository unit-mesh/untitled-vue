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
      <h1 class="title">Hello, World!</h1>
      <p class="description">这是一个丰富的 Hello World 示例页面。</p>
    </div>

    <!-- 返回顶部按钮 -->
    <BackToTop class="back-to-top" v-show="true" />
  </div>
</template>

<script>
import Hamburger from '../components/Hamburger/index.vue';
import PanThumb from '../components/PanThumb/index.vue';
// import ThemePicker from '../components/ThemePicker/index.vue';
import Screenfull from '../components/Screenfull/index.vue';
import BackToTop from '../components/BackToTop/index.vue';

export default {
  name: 'HelloWorld',
  components: {
    Hamburger,
    PanThumb,
    // ThemePicker,
    Screenfull,
    BackToTop,
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

<template>
  <div :class="{ show: show }" class="header-search">
    <SvgIcon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />
    <a-select
      ref="headerSearchSelect"
      v-model:value="search"
      :options="options"
      :filter-option="false"
      :show-search="true"
      :default-active-first-option="true"
      :not-found-content="null"
      placeholder="Search"
      class="header-search-select"
      @change="change"
      @search="querySearch"
      @focus="handleFocus"
    />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'pinia';
import { usePermissionStore } from '@/store/permission';
import Fuse from 'fuse.js';
import SvgIcon from '../SvgIcon/index.vue';

export default {
  name: 'HeaderSearch',
  components: {
    SvgIcon,
  },
  setup() {
    const router = useRouter();
    const store = usePermissionStore();

    const search = ref('');
    const options = ref([]);
    const searchPool = ref([]);
    const show = ref(false);
    const fuse = ref(null);

    const routes = computed(() => store.permission_routes);

    watch(routes, () => {
      searchPool.value = generateRoutes(routes.value);
    });

    watch(searchPool, (list) => {
      initFuse(list);
    });

    watch(show, (value) => {
      if (value) {
        document.body.addEventListener('click', close);
      } else {
        document.body.removeEventListener('click', close);
      }
    });

    onMounted(() => {
      searchPool.value = generateRoutes(routes.value);
    });

    function click() {
      show.value = !show.value;
      if (show.value) {
        headerSearchSelect.value.focus();
      }
    }

    function close() {
      headerSearchSelect.value.blur();
      options.value = [];
      show.value = false;
    }

    function change(val) {
      router.push(val.path);
      search.value = '';
      options.value = [];
      show.value = false;
    }

    function initFuse(list) {
      fuse.value = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3,
          },
        ],
      });
    }

    function generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle],
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = generateRoutes(router.children, data.path, data.title);
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    }

    function querySearch(query) {
      if (query !== '') {
        options.value = fuse.value.search(query).map(item => ({
          value: item.item,
          label: item.item.title.join(' > '),
        }));
      } else {
        options.value = [];
      }
    }

    function handleFocus() {
      if (show.value) {
        headerSearchSelect.value.focus();
      }
    }

    return {
      search,
      options,
      show,
      headerSearchSelect,
      click,
      close,
      change,
      querySearch,
      handleFocus,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
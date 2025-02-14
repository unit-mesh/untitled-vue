<template>
  <div class="dndList">
    <div :style="{ width: width1 }" class="dndList-list">
      <h3>{{ list1Title }}</h3>
      <a-list item-layout="horizontal" :data-source="list1">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>
                {{ item.id }} [{{ item.author }}] {{ item.title }}
              </template>
            </a-list-item-meta>
            <template #actions>
              <a @click="deleteEle(item)">
                <DeleteOutlined style="color: #ff4949"/>
              </a>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div :style="{ width: width2 }" class="dndList-list">
      <h3>{{ list2Title }}</h3>
      <a-list item-layout="horizontal" :data-source="list2">
        <template #renderItem="{ item }">
          <a-list-item @click="pushEle(item)">
            <a-list-item-meta :title="`${item.id} [${item.author}] ${item.title}`"/>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { List } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'

const AList = List
const AListItem = List.Item
const AListItemMeta = List.Item.Meta

const props = defineProps({
  list1: {
    type: Array,
    default: () => [],
  },
  list2: {
    type: Array,
    default: () => [],
  },
  list1Title: {
    type: String,
    default: 'list1',
  },
  list2Title: {
    type: String,
    default: 'list2',
  },
  width1: {
    type: String,
    default: '48%',
  },
  width2: {
    type: String,
    default: '48%',
  },
})

const isNotInList1 = (v) => {
  return props.list1.every((k) => v.id !== k.id)
}

const isNotInList2 = (v) => {
  return props.list2.every((k) => v.id !== k.id)
}

const deleteEle = (ele) => {
  for (const item of props.list1) {
    if (item.id === ele.id) {
      const index = props.list1.indexOf(item)
      props.list1.splice(index, 1)
      break
    }
  }
  if (isNotInList2(ele)) {
    props.list2.unshift(ele)
  }
}

const pushEle = (ele) => {
  for (const item of props.list2) {
    if (item.id === ele.id) {
      const index = props.list2.indexOf(item)
      props.list2.splice(index, 1)
      break
    }
  }
  if (isNotInList1(ele)) {
    props.list1.push(ele)
  }
}
</script>

<style lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  .dndList-list {
    float: left;
    padding-bottom: 30px;

    &:first-of-type {
      margin-right: 2%;
    }

    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4ab7bd;
}

.list-complete-item.sortable-ghost {
  background: #30b08f;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
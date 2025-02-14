<template>
  <div v-if="errorLogs.length > 0">
    <a-badge :count="1" dot @click="dialogTableVisible = true">
      <a-button style="padding: 8px 10px" size="small" danger>
        <svg-icon icon-class="bug" />
      </a-button>
    </a-badge>

    <a-modal
      v-model:visible="dialogTableVisible"
      width="80%"
      :footer="null"
      :maskClosable="false"
      :closable="false"
    >
      <template #title>
        <div>
          <span style="padding-right: 10px">Error Log</span>
          <a-button size="small" type="primary" @click="clearAll">
            <template #icon><DeleteOutlined /></template>
            Clear All
          </a-button>
        </div>
      </template>
      <a-table :dataSource="errorLogs" :columns="columns" bordered>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'message'">
            <div>
              <span class="message-title">Msg:</span>
              <a-tag color="error">
                {{ record.err.message }}
              </a-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 10px">Info:</span>
              <a-tag color="warning">
                {{ record.vm.$vnode.tag }} error in {{ record.info }}
              </a-tag>
            </div>
            <br />
            <div>
              <span class="message-title" style="padding-right: 16px">Url:</span>
              <a-tag color="success">
                {{ record.url }}
              </a-tag>
            </div>
          </template>
          <template v-else-if="column.key === 'stack'">
            {{ record.err.stack }}
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { Badge as ABadge, Button as AButton, Modal as AModal, Table as ATable, Tag as ATag } from 'ant-design-vue'
import SvgIcon from '../SvgIcon/index.vue'

const store = useStore()
const dialogTableVisible = ref(false)

const errorLogs = computed(() => store.getters.errorLogs || [])

const columns = [
  { title: 'Message', key: 'message' },
  { title: 'Stack', key: 'stack' }
]

const clearAll = () => {
  dialogTableVisible.value = false
  store.dispatch('errorLog/clearErrorLog')
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
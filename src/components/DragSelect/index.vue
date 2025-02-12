<template>
  <a-select
      ref="dragSelect"
      v-model:value="selectVal"
      v-bind="$attrs"
      class="drag-select"
      mode="multiple"
      @change="handleChange"
  >
    <slot/>
  </a-select>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Sortable from 'sortablejs'
import { Select } from 'ant-design-vue'

export default {
  components: {
    ASelect: Select
  },
  name: 'DragSelect',
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  emits: ['update:value'],
  setup (props, { emit }) {
    const dragSelectRef = ref(null)

    const selectVal = computed({
      get () {
        return [...props.value]
      },
      set (val) {
        emit('update:value', [...val])
      }
    })

    const handleChange = (value) => {
      selectVal.value = value
    }

    const setSort = () => {
      console.log(dragSelectRef)
      const el = dragSelectRef.value.$el.querySelectorAll('.ant-select-selection-overflow')[0]
      Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: (evt) => {
          const targetRow = selectVal.value.splice(evt.oldIndex, 1)[0]
          selectVal.value.splice(evt.newIndex, 0, targetRow)
          emit('update:value', [...selectVal.value])
        }
      })
    }

    onMounted(() => {
      setSort()
    })

    return {
      dragSelectRef,
      selectVal,
      handleChange
    }
  }
}
</script>

<style scoped>
.drag-select >>> .sortable-ghost {
  opacity: .8;
  color: #fff !important;
  background: #42b983 !important;
}

.drag-select >>> .ant-select-selection-item {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { isQuesWordTypeSelect } from '../quesUtils'
import { QuesAnswerStatus, type QuesFillBox, type QuesWordData } from '../typing'
import TheQuesWordFill from './theQuesWordFill.vue'
import TheQuesWordItem from './theQuesWordItem.vue'
import TheQuesWordOptions from './theQuesWordOptions.vue'

const props = defineProps<{ item: QuesWordData }>()
const emits = defineEmits(['change'])

const isTypeSelect = computed(() => isQuesWordTypeSelect(props.item.type))

const optionList = computed(() => {
  if (isTypeSelect.value) {
    return props.item.optionList || []
  }
  return []
})

function optionChange(index) {
  const right = props.item.enValue === optionList.value[index].enValue
  emits('change', { index, right, status: QuesAnswerStatus.NOT_EMPTY })
}

function onFillChange(boxs: QuesFillBox[]) {
  let status = QuesAnswerStatus.EMPTY
  if (boxs.some(item => item.input && item.value)) {
    status = QuesAnswerStatus.NOT_EMPTY
  }
  const right = props.item.enValue === boxs.map(box => box.value).join('')
  emits('change', { boxs, right, status })
}
</script>

<template>
  <div>
    <TheQuesWordItem :type="item.type" :zh-value="item.zhValue" :en-value="item.enValue" />
    <TheQuesWordOptions v-if="isTypeSelect" :model-value="item.answer.index" :list="optionList" @update:model-value="optionChange" />
    <TheQuesWordFill v-else :value="item.enValue" :answer="item.answer.boxs" :level="item.fillLevel" @change="onFillChange" />
  </div>
</template>

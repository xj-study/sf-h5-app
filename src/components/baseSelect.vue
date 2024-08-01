<script setup lang="ts">
import type { SelectItem } from './typing'

interface Props {
  list: SelectItem[]
  multiSelect?: boolean
  quickAdd?: boolean
  loading?: boolean
  emptyIcon?: string
  emptyTitle?: string
}
const props = withDefaults(defineProps<Props>(), {
  multiSelect: false,
  loading: false,
  emptyIcon: 'no-record',
  emptyTitle: '暂无内容',
})

const emits = defineEmits(['confirm', 'add'])

const select = defineModel<string[] >({ default: [] })

function onClick(item: SelectItem) {
  if (props.multiSelect) {
    toMultiSelect(item)
  } else {
    toSingleSelect(item)
  }
}

// 多选
function toMultiSelect(item: SelectItem) {
  if (select.value == null) {
    select.value = [`${item.value}`]
    return
  }

  const current = select.value.slice()
  const index = current.indexOf(`${item.value}`)
  if (index >= 0) {
    current.splice(index, 1)
    select.value = current
  } else {
    current.push(`${item.value}`)
  }

  select.value = current
}
// 单选
function toSingleSelect(item: SelectItem) {
  select.value = [`${item.value}`]
  emits('confirm', select.value)
}

// 检查一下是否选中
function checkSelect(item) {
  if (select.value == null)
    return false
  if (props.multiSelect) {
    const current: string[] = select.value as string[]
    const index = current.indexOf(`${item.value}`)

    return index >= 0
  } else {
    return select.value === item.value
  }
}

function onConfirm() {
  emits('confirm', select.value)
}
function onReset() {
  select.value = []
}

const addFiledValue = ref('')
function onAdd() {
  emits('add', addFiledValue.value)
}

const emptyIconURL = computed(
  () => `https://config.lotuscars.com.cn/sales-assistant/placeholder/${props.emptyIcon}.png`,
)
</script>

<template>
  <div class="h-full flex flex-col text-[#222]">
    <div>
      <slot name="header" />
    </div>
    <div class="relative flex-1 overflow-y-auto">
      <div v-if="loading" class="absolute bottom-0 left-0 right-0 top-0 mt-20 bg-[rgba(255,255,255,.2)] text-center">
        <van-loading size="20" color="#1989fa" />
      </div>
      <div v-if="list.length > 0">
        <div
          v-for="item in list" :key="item.value"
          class="m-x-14 border-b-1 border-[rgba(0,0,0,.06)] border-b-solid p-y-10 last:border-b-0"
          @click="onClick(item)"
        >
          <div v-if="!$slots.default" class="flex items-center justify-between">
            <span>
              {{ item.label }}
            </span>
            <div v-show="checkSelect(item)" class="i-carbon-checkmark text-18 text-green-500" />
          </div>
          <slot v-else />
        </div>
      </div>
      <div v-else class="flex flex-col items-center pt-80 text-slate-400">
        <img :src="emptyIconURL" alt="" class="mt-8 w-85">
        <div class="text-12">
          {{ emptyTitle }}
        </div>
      </div>
    </div>
    <div v-if="quickAdd" class="m-x-14 flex items-center border-t-1 border-[rgba(0,0,0,.06)] border-t-solid">
      <van-field v-model="addFiledValue" class="p-x-0" :border="false" label="快速新增" placeholder="请输入内容" />
      <div v-show="addFiledValue" class="i-carbon-add-alt m-10 text-18" @click="onAdd" />
    </div>
    <div v-if="!$slots.footer" class="m-16 mb-30 flex items-center">
      <div class="min-w-30" @click="onReset">
        <div class="i-carbon-renew text-26 text-blue-500 transition active:rotate-180 active:text-30" />
      </div>
      <base-button v-if="multiSelect" class="ml-10 flex-1" plain type="primary" @click="onConfirm">
        确定
      </base-button>
    </div>

    <slot v-else name="footer" />
  </div>
</template>

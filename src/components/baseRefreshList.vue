<script setup lang="ts">
import type { Page } from '@/typing'

interface Prop {
  pageSize?: number
  getList: (page?: Page) => Promise<any>
  check?: () => boolean
  finishedText?: string
  emptyIcon?: string
  emptyTitle?: string
  closeInit?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<Prop>(), {
  pageSize: 20,
  finishedText: '没有更多了',
  emptyIcon: 'no-record',
  emptyTitle: '暂无内容',
  closeInit: false,
  reverse: false,
})

const emits = defineEmits(['change'])

const pageNum = ref(1)
const emptyIconURL = computed(
  () => `https://config.lotuscars.com.cn/sales-assistant/placeholder/${props.emptyIcon}.png`,
)

const list = ref([])
const listRef = ref(null)
const refreshLoading = ref(false)
const loading = ref(false)
const finished = ref(false)

const finishedTextStr = computed(() => {
  if (finished.value && !list.value.length) {
    return ''
  }
  return props.finishedText
})

const listShow = computed(() => {
  if (props.reverse)
    return list.value.slice().reverse()
  return list.value
})

function emitChange() {
  const size = listShow.value.length
  emits('change', {
    size,
  })
}

function onLoad() {
  if (props.closeInit) {
    loading.value = false
    return
  }
  if (refreshLoading.value)
    return
  if (props.check) {
    if (!props.check()) {
      loading.value = false
      return
    }
  }
  if (list.value.length) {
    pageNum.value++
  }
  getData()
}

function onRefresh(refresh = true) {
  pageNum.value = 1
  refresh && (refreshLoading.value = true)

  finished.value = true
  getData(false)
}

async function getData(showLoading: boolean = true) {
  await _getData(showLoading).catch(() => {
    loading.value = false
    refreshLoading.value = false
    finished.value = true
  })
}

async function _getData(showLoading = true) {
  showLoading && (loading.value = true)
  if (props.getList) {
    let result = await props.getList({ pageNum: pageNum.value, pageSize: props.pageSize })
    if (Array.isArray(result)) {
      result = { records: result, size: result.length + 1 }
    } else if (result == null) {
      result = { records: [] }
    }
    const { records, size } = result
    loading.value = false
    refreshLoading.value = false
    finished.value = records.length < size

    if (pageNum.value === 1) {
      list.value = records
    } else {
      list.value.push(...records)
    }

    emitChange()
  } else {
    console.error('getList不能来空')
  }
}

onMounted(() => {
  if (props.closeInit)
    return
  // mounted
  if (list.value.length) {
    onRefresh()
  }
})

function update<T>(item: T, equals: (item: T) => boolean | null | string, options: { remove: boolean } = { remove: false }) {
  let index = -1
  if (typeof equals === 'function') {
    index = list.value.findIndex(equals)
  } else if (typeof equals === 'string') {
    index = list.value.findIndex((ele) => {
      return ele[equals] === item[equals]
    })
  }

  if (index < 0) {
    list.value.splice(list.value.length, 0, { ...item })
  } else {
    if (options.remove) {
      list.value.splice(index, 1)
    } else {
      list.value.splice(index, 1, { ...item })
    }
  }

  emitChange()
}

defineExpose({
  update,
  onRefresh,
})
</script>

<template>
  <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
    <slot name="header" />
    <van-list
      ref="listRef"
      v-model:loading="loading"
      :finished-text="finishedTextStr"
      :finished="finished"
      :immediate-check="true"
      @load="onLoad"
    >
      <div v-if="listShow.length > 0">
        <slot v-for="data in listShow" :item-data="data" />
      </div>
      <template v-else-if="!loading">
        <slot v-if="$slots.empty" name="empty" />
        <div v-else class="flex flex-col items-center pt-120 text-slate-400">
          <img :src="emptyIconURL" alt="" class="mt-8 w-115">
          <div class="text">
            {{ emptyTitle }}
          </div>
        </div>
      </template>
    </van-list>
  </van-pull-refresh>
</template>

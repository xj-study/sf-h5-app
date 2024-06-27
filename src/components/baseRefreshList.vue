<script setup lang="ts">
const props = defineProps({
  pageSize: { type: Number, default: 20 },
  getList: { type: Function, default: null },
  check: { type: Function, default: null },
  finishedText: { type: String, default: '' },
  //
  emptyIcon: { type: String, default: 'no-record' },
  emptyTitle: { type: String, default: '暂无内容' },

  // 关闭初始化
  closeInit: { type: Boolean, default: false },
})
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
  return props.finishedText || '没有更多了'
})

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
      result = {}
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

function update(item, equals) {
  const index = list.value.findIndex(equals)
  if (index < 0) {
    list.value.splice(list.value.length, 0, { ...item })
  } else {
    list.value.splice(index, 1, { ...item })
  }
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
      <div v-if="list.length > 0">
        <slot :list="list" />
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

<script setup lang="ts">
import { showToast } from 'vant'
import TheCustomTaskItem from './components/theCustomTaskItem.vue'
import TheTaskForm from './components/theTaskForm.vue'
import { TaskForm } from './types'
import useLoading from '@/hooks/useLoading'
import { taskAdd, taskQuery, taskUpdate } from '@/api/taskApi'
import useMainPage from '@/hooks/useMainPage'
import type { SelectItem } from '@/components/typing'
import { tagAdd, tagQuery } from '@/api/tagApi'

definePage({
  name: 'taskCustom',
  meta: {
    level: 2,
    title: '任务定制',
  },
})

const { mainPageRef, listUpdate, onRefresh } = useMainPage()

const keyword = ref('')
function toSearch() {
  onRefresh()
}

async function getList() {
  const params: { keyword?: string } = { }

  if (keyword.value) {
    params.keyword = keyword.value
  }
  const records = await taskQuery(params)
  return records
}

const editShowFlag = ref(false)
const formData = ref<TaskForm>(null)
const taskFormTitle = ref('')

const formTag = computed(() => {
  if (formData.value)
    return formData.value.tag.map(v => `${v}`)
  return []
})

function toEdit(itemData) {
  formData.value = { ...itemData }
  taskFormTitle.value = '编辑任务'
  editShowFlag.value = true
}

function toAdd() {
  formData.value = new TaskForm()
  taskFormTitle.value = '新增任务'
  editShowFlag.value = true
}

function toDelete(itemData) {
  listUpdate(itemData, 'id', { remove: true })
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: TaskForm) => {
  if (item.id) {
    // update
    await taskUpdate(item)
    showToast('更新成功')
    listUpdate(item, 'id')
  } else {
    // add
    const id = await taskAdd(item)
    item.id = id
    showToast('添加成功')
    listUpdate(item)
  }

  setTimeout(() => {
    formData.value = null
  }, 50)
  editShowFlag.value = false
})

const popupRef = ref()
const tagKeyword = ref('')
const tagslist = ref<SelectItem[]>([])
const tagListShow = computed<SelectItem[]>(() => tagslist.value.filter(item => item.label.includes(tagKeyword.value)))

const { loading: loadTags, loadingFlag: loadingTags } = useLoading(async () => {
  const result = await tagQuery({})
  tagslist.value = (result || []).map((item) => {
    const { id, name } = item
    return { value: id, label: name }
  })
})

function onChange() {
  popupRef.value.open()
  loadTags()
}
// 添加
async function onTagAdd(label: string) {
  let item = tagslist.value.find(el => el.label === label)
  if (!item) {
    const id = await tagAdd(label)
    item = { value: id, label }
  }

  formData.value.tag = [`${item.value}`]
  formData.value.tagStr = item.label
  popupRef.value.close()

  // 新增标签了
}
function onTagConfirm(data) {
  formData.value.tag = data
  formData.value.tagStr = data.map((val) => {
    const item = tagslist.value.find(ele => ele.value === +val)
    return item?.label || ''
  }).join(',')
  popupRef.value.close()
}
</script>

<template>
  <base-main-page ref="mainPageRef" :get-list="getList">
    <template #head-tool>
      <div class="flex items-center">
        <base-search v-model:input="keyword" class="flex-1" @change="toSearch" />
        <base-button icon="add" size="small" @click="toAdd">
          新增任务
        </base-button>
      </div>
    </template>

    <template #default="{ itemData }">
      <TheCustomTaskItem :key="itemData.id" :item="itemData" @delete="toDelete" @edit="toEdit" />
    </template>
    <template #popup>
      <base-popup ref="popupRef" v-model:show="editShowFlag" :title="taskFormTitle">
        <TheTaskForm :confirm-loading="loadingFlag" :item-data="formData" @change="onChange" @confirm="onConfirm" />
        <template #right>
          <base-select :list="tagListShow" :model-value="formTag" :loading="loadingTags" class="max-h-60vh" quick-add multi-select @add="onTagAdd" @confirm="onTagConfirm">
            <template #header>
              <base-search v-model:input="tagKeyword" placeholder="请输入关键字" @change="loadTags" />
            </template>
          </base-select>
        </template>
      </base-popup>
    </template>
  </base-main-page>
</template>

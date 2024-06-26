<script setup lang="ts">
import useUserStore from '@/stores/modules/user'

definePage({
  name: 'profile',
  meta: {
    level: 1,
    title: '我的',
    tabbar: true,
  },
})

const { parentTypeFlag } = useUserStore()

const router = useRouter()
function toTaskList(id: number) {
  router.push(`/task?id=${id}`)
}
function toCustomTask() {
  router.push('/task/custom')
}
function toCustomGift() {
  router.push('/gift/custom')
}
</script>

<template>
  <base-container :padding-x="0">
    <base-cell-head title="我的任务">
      <base-button plain type="primary" size="normal" @click="toTaskList(1)">
        待完成
      </base-button>
      <base-button class="ml-10" plain type="primary" size="normal" @click="toTaskList(1)">
        已完成
      </base-button>
    </base-cell-head>
    <base-cell-head v-if="parentTypeFlag" title="我的孩子">
      <base-button plain type="primary" size="normal" @click="toTaskList(1)">
        璇璇
      </base-button>
    </base-cell-head>
    <base-cell-head v-if="parentTypeFlag" title="我的工具">
      <base-button plain type="primary" size="normal" @click="toCustomTask">
        定制任务
      </base-button>
      <base-button class="ml-10" plain type="primary" size="normal" @click="toCustomGift">
        定制礼物
      </base-button>
    </base-cell-head>
  </base-container>
</template>

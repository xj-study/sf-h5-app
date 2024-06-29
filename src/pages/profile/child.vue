<script setup lang="ts">
definePage({
  name: 'profile/child',
  meta: {
    level: 2,
    title: '我的孩子',
  },
})
const router = useRouter()
const route = useRoute()
function toTaskList() {
  router.push(`/task?id=${route.query.id}`)
}
function toGiftOrderList() {
  //
}
</script>

<template>
  <base-container :padding-x="0">
    <base-cell-head title="近况">
      <base-button plain type="primary" size="normal" @click="toTaskList">
        任务情况
      </base-button>
      <base-button class="ml-10" plain type="primary" size="normal" @click="toGiftOrderList">
        礼物兑换情况
      </base-button>
    </base-cell-head>
  </base-container>
</template>

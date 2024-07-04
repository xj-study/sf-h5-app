<script setup lang="ts">
definePage({
  name: 'game',
  meta: {
    level: 2,
    title: '益智小游戏',
  },
})

const router = useRouter()
function toGame(type) {
  router.push(`/game/${type}`)
}
</script>

<template>
  <base-container :padding-x="0">
    <base-cell-head title="小游戏">
      <base-button plain type="primary" size="normal" @click="toGame('point24')">
        24点
      </base-button>
      <base-button class="ml-8" plain type="primary" size="normal" @click="toGame('snake')">
        贪吃蛇
      </base-button>
    </base-cell-head>
  </base-container>
</template>

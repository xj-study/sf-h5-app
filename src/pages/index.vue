<script setup lang="ts">
import useToken from '@/hooks/useToken'

definePage({
  name: 'home',
  meta: {
    level: 1,
    tabbar: true,
  },
})

const router = useRouter()
function onStart() {
  useToken(() => {
    router.push('/task/custom')
  })
}
</script>

<template>
  <base-container :padding-x="20" class="pb-50">
    <div class="text-22">
      SF - 代号007
    </div>
    <div class="pb-16 pt-16">
      家长通过定制任务及礼物，然后孩子通过完成定制的任务获取积分，通过积分兑换礼物，达到激励孩子完成任务的目标。
    </div>
    <van-button type="primary" @click="onStart">
      开始定制任务吧
    </van-button>
  </base-container>
</template>

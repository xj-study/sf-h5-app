<script setup lang="ts">
import useUserStore from '@/stores/modules/user'

defineProps({
  price: { type: Number, default: 0 },
  postfix: { type: String, default: '积分' },
})
const { user } = useUserStore()
</script>

<template>
  <div>
    {{ price * user.exchangeRatio }} <span class="text-12 color-gray">{{ postfix }}</span>
  </div>
</template>

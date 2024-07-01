<script setup lang="ts">
import useUserStore from '@/stores/modules/user'

const props = defineProps({
  price: { type: Number, default: 0 },
  postfix: { type: String, default: '积分' },
  closeRatio: { type: Boolean, default: false },
})

const { user } = useUserStore()
const priceText = computed(() => {
  const result = props.price
  if (props.closeRatio)
    return result
  return result * user.exchangeRatio
})
</script>

<template>
  <div>
    {{ priceText }} <span class="text-12 color-gray">{{ postfix }}</span>
  </div>
</template>

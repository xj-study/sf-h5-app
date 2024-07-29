<script setup lang="ts">
import useUserStore from '@/stores/modules/user'

interface Props {
  price?: number | string
  postfix?: string
  closeRatio?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  price: 0,
  postfix: '积分',
  closeRatio: false,
})

const { user } = useUserStore()
const priceText = computed(() => {
  const result = +props.price
  if (props.closeRatio)
    return result
  return result * user.exchangeRatio
})
</script>

<template>
  <div>
    {{ priceText }}

    <van-icon name="points" class="ml-4" />
  </div>
</template>

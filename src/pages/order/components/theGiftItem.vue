<script setup lang="ts">
import useUserStore from '@/stores/modules/user'

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})
defineEmits(['buy'])
const { user } = useUserStore()
const btnDisabled = computed(() => {
  return props.item.price * user.exchangeRatio > user.integral
})
</script>

<template>
  <div class="m-10 bg-white p-10">
    <div class="flex justify-between text-16">
      <div> {{ item.name }} </div>
      <base-gift-price :price="item.price" class="text-emerald-600" />
    </div>
    <div class="mt-8 text-14">
      {{ item.content }}
    </div>
    <div class="mt-20 flex items-center">
      <base-button size="small" :disabled="btnDisabled" plain type="primary" class="min-w-100" @click="$emit('buy', item)">
        兑换
      </base-button>
      <span v-if="btnDisabled" class="ml-10 text-12 color-red">积分不足</span>
    </div>
  </div>
</template>

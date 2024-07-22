<script setup lang="ts">
import { OrderGiftForm } from '../typing'
import useForm, { type FormProp } from '@/hooks/useForm'
import useUserStore from '@/stores/modules/user'

const props = defineProps<FormProp<OrderGiftForm>>()

const emits = defineEmits(['confirm'])

const { form } = useForm({
  init: () => new OrderGiftForm(),
  getItemData: () => props.itemData,
})

const { user } = useUserStore()
const totalPrice = computed(() => {
  const num = form.num || 1
  return num * (+form.price)
})
const confirmDisable = computed(() => {
  return totalPrice.value * user.exchangeRatio > user.integral
})

function onSubmit() {
  if (!form.num)
    form.num = 1
  emits('confirm', form)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <div class="m-x-20 mb-20 border-b-0.5 border-b-gray border-b-solid pb-10">
      <base-gift-price :price="form.price" class="text-20 text-emerald-600" />
      <div class="m-y-8 text-16">
        {{ form.name }}
      </div>
      <div class="text-14">
        {{ form.content }}
      </div>
    </div>
    <van-cell-group inset>
      <van-field label="数量">
        <template #input>
          <van-stepper v-model="form.num" />
        </template>
      </van-field>
      <van-field
        v-model="form.mark"
        type="textarea"
        rows="2"

        label="备注"
        placeholder="请填写备注"
        clearable
      />
    </van-cell-group>
    <div class="m-16 flex justify-between">
      <div class="mb-10 flex flex-shrink-1 items-end">
        <span class="text-12 color-gray">花费：</span>
        <base-gift-price :price="totalPrice" class="text-20 text-emerald-600" />
      </div>

      <base-button :inline="false" :disabled="confirmDisable" :loading="confirmLoading" class="min-w-200" type="primary" native-type="submit">
        <span>立即兑换</span>
        <span v-show="confirmDisable" class="text-12">(积分不足)</span>
      </base-button>
    </div>
  </van-form>
</template>

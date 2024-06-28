<script setup lang="ts">
import { GiftForm } from '../typing'

const props = defineProps({
  confirmLoading: { type: Boolean, default: false },
  itemData: { type: Object },
})

const emits = defineEmits(['confirm'])

const form = reactive<GiftForm>(new GiftForm())

watchEffect(() => {
  for (const key in form) {
    if (props.itemData) {
      form[key] = props.itemData[key]
    } else {
      form[key] = ''
    }
  }
})

function onSubmit() {
  emits('confirm', form)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.name"

        label="标题"
        placeholder="标题"
        clearable
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <van-field
        v-model="form.price"

        label="价格"
        placeholder="价格"
        clearable
        :rules="[{ required: true, message: '请填写价格' }]"
      />
      <van-field
        v-model="form.content"
        type="textarea"
        rows="2"

        label="内容"
        placeholder="内容"
        clearable
        :rules="[{ required: true, message: '请填写内容' }]"
      />
    </van-cell-group>
    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

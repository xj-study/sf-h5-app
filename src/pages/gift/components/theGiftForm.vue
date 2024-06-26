<script setup lang="ts">
import type { GiftForm } from '../domain/gift'

const props = defineProps({
  itemData: { type: Object },
})

const emits = defineEmits(['confirm'])

const form = reactive<GiftForm>({ title: '', content: '', price: 0 })

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
        v-model="form.title"
        name="礼物标题"
        label="礼物标题"
        placeholder="礼物标题"
        clearable
        :rules="[{ required: true, message: '请填写礼物标题' }]"
      />
      <van-field
        v-model="form.price"
        name="礼物价格"
        label="礼物价格"
        placeholder="礼物价格"
        clearable
        :rules="[{ required: true, message: '请填写礼物价格' }]"
      />
      <van-field
        v-model="form.content"
        type="textarea"
        rows="2"
        name="礼物内容"
        label="礼物内容"
        placeholder="礼物内容"
        clearable
        :rules="[{ required: true, message: '请填写礼物内容' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button block type="primary" native-type="submit">
        确认
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { StoryLevelItem } from '../../typing'
import useForm, { type FormProp } from '@/hooks/useForm'

import TheRulesForm from '@/pages/components/rules/theRulesForm.vue'

const props = defineProps<FormProp<StoryLevelItem>>()

const emits = defineEmits(['confirm'])

const { form } = useForm({
  init: () => new StoryLevelItem(),
  getItemData: () => props.itemData,
})

function onSubmit() {
  emits('confirm', form)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.levelOrder"
        label="关卡序号"
        placeholder="关卡序号"
        clearable
        :rules="[{ required: true, message: '请填写关卡序号' }]"
      />

      <van-field
        v-model="form.title"

        label="标题"
        placeholder="标题"
        clearable
        :rules="[{ required: true, message: '请填写标题' }]"
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
      <van-field
        v-model="form.prize"
        label="奖励积分"
        placeholder="奖励积分"
        clearable
      />

      <TheRulesForm v-model:type="form.refType" v-model:rules="form.refRules" label="类型" />
    </van-cell-group>

    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

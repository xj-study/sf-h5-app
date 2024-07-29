<script setup lang="ts">
import { type StoryItem, StoryType, StoryTypeItems } from '../typing'
import useForm, { type FormProp } from '@/hooks/useForm'

const props = defineProps<FormProp<StoryItem>>()

const emits = defineEmits(['confirm'])

const { form } = useForm<StoryItem>({
  init: () => ({
    id: 0,
    title: '',
    content: '',
    costAmount: 0,
    status: 0,
    type: StoryType.DETAIL,
  }),
  getItemData: () => props.itemData,
})

function onSubmit() {
  emits('confirm', form)
}

const typeDesc = computed(() => form.type === StoryType.DETAIL ? '显示关卡详情信息' : '关卡更简化')
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field label="单词难度">
        <template #input>
          <base-tag-select
            v-model="form.type"
            tag-cls="text-14"
            :list="StoryTypeItems"
          />
          <div class="text-12 text-gray">
            {{ typeDesc }}
          </div>
        </template>
      </van-field>
      <van-field
        v-model="form.costAmount"
        label="门票积分"
        placeholder="门票积分"
        clearable
      />
      <van-field
        v-model="form.title"
        name="标题"
        label="标题"
        placeholder="标题"
        clearable
        :rules="[{ required: true, message: '请填写标题' }]"
      />
      <van-field
        v-model="form.content"
        type="textarea"
        rows="2"
        name="内容"
        label="内容"
        placeholder="内容"
        clearable
      />
    </van-cell-group>
    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

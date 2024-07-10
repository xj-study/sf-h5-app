<script setup lang="ts">
import type { StoryLevelItem } from '../../typing'

interface Props {
  confirmLoading: boolean
  itemData: StoryLevelItem | null
}

const props = defineProps<Props>()

const emits = defineEmits(['confirm'])

const form = reactive<StoryLevelItem>({ id: 0, title: '', content: '', prize: 0 })

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
        :rules="[{ required: true, message: '请填写内容' }]"
      />
      <van-field
        v-model="form.prize"
        label="奖励积分"
        placeholder="奖励积分"
        clearable
      />

      <!-- <van-field label="类型">
        <template #input>
          <van-radio-group v-model="form.taskType">
            <van-radio v-for="item in taskTypeOptions" :key="item.name" class="mt-10" :name="item.name">
              {{ item.label }}
            </van-radio>
          </van-radio-group>
        </template>
      </van-field> -->
    </van-cell-group>
    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

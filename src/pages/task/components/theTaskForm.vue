<script setup lang="ts">
import { TaskForm, TaskType, TaskTypeOptions } from '../types'
import TheTaskTypePoint24Form from './theTaskTypePoint24Form.vue'

const props = defineProps({
  confirmLoading: { type: Boolean, default: false },
  itemData: { type: Object },
})

const emits = defineEmits(['confirm'])

const form = reactive<TaskForm>(new TaskForm())
const taskTypeOptions = TaskTypeOptions

watchEffect(() => {
  const defaultTaskData = new TaskForm()
  for (const key in form) {
    if (props.itemData) {
      form[key] = props.itemData[key]
    } else {
      form[key] = defaultTaskData[key]
    }
  }
})

const isTaskPoint24 = computed(() => form.taskType === TaskType.GAME_POINT24)

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
        v-model="form.integral"
        label="奖励积分"
        placeholder="奖励积分"
        clearable
        :rules="[{ required: true, message: '请填写奖励积分' }]"
      />
      <van-field label="类型">
        <template #input>
          <van-radio-group v-model="form.taskType">
            <van-radio v-for="item in taskTypeOptions" :key="item.name" class="mt-10" :name="item.name">
              {{ item.label }}
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <TheTaskTypePoint24Form v-if="isTaskPoint24" v-model="form.rules" />

      <van-field label="是否审批">
        <template #input>
          <van-switch v-model="form.verifyFlag" />
        </template>
      </van-field>
    </van-cell-group>
    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

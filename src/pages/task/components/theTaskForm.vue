<script setup lang="ts">
import { TaskForm } from '../types'
import useForm, { type FormProp } from '@/hooks/useForm'
import theRulesForm from '@/pages/components/rules/theRulesForm.vue'

const props = defineProps<FormProp<TaskForm>>()

const emits = defineEmits(['confirm'])

const { form } = useForm<TaskForm>({
  init: () => new TaskForm(),
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
        type="number"
        placeholder="奖励积分"
        clearable
        :rules="[{ required: true, message: '请填写奖励积分' }]"
      />

      <theRulesForm v-model:type="form.taskType" v-model:rules="form.rules" label="类型" />

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

<script setup lang="ts">
import { TaskForm } from '../types'
import useForm, { type FormProp } from '@/hooks/useForm'

import thePoint24RulesForm from '@/pages/components/rules/thePoint24RulesForm.vue'
import { RulesConf, RulesTypeOptions } from '@/pages/components/rules/typing'
import useRulesType from '@/pages/components/rules/useRulesType'

const props = defineProps<FormProp<TaskForm>>()

const emits = defineEmits(['confirm'])

const { form } = useForm<TaskForm>({
  init: () => new TaskForm(),
  getItemData: () => props.itemData,
})
const { isTypePoint24 } = useRulesType(form, new RulesConf('taskType'))
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
            <van-radio v-for="item in RulesTypeOptions" :key="item.name" class="mt-10" :name="item.name">
              {{ item.label }}
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <thePoint24RulesForm v-if="isTypePoint24" v-model="form.rules" />

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

<script setup lang="ts">
import { StoryLevelItem } from '../../typing'
import useForm, { type FormProp } from '@/hooks/useForm'
import { RulesConf, RulesTypeOptions } from '@/pages/components/rules/typing'
import useRulesType from '@/pages/components/rules/useRulesType'
import thePoint24RulesForm from '@/pages/components/rules/thePoint24RulesForm.vue'

const props = defineProps<FormProp<StoryLevelItem>>()

const emits = defineEmits(['confirm'])

const { form } = useForm({
  init: () => new StoryLevelItem(),
  getItemData: () => props.itemData,
})
const { isTypePoint24 } = useRulesType(form, new RulesConf('refType', 'refRules'))
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

      <van-field label="类型">
        <template #input>
          <van-radio-group v-model="form.refType">
            <van-radio v-for="item in RulesTypeOptions" :key="item.name" class="mt-10" :name="item.name">
              {{ item.label }}
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>

    <thePoint24RulesForm v-if="isTypePoint24" v-model="form.refRules" />

    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

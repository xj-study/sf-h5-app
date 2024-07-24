<script setup lang="ts">
import { EngWordQuesFillLevels, EngWordQuesTypes, type LearnEngWord, LearnEngWordQuesType, initLearnEngWord } from './typing'
import useRulesForm from './useRulesForm'
import { WordLevels } from '@/pages/words/typing'

const props = defineModel<LearnEngWord>()

const { formData, onUpdate } = useRulesForm<LearnEngWord, LearnEngWord>(props, {
  initData: initLearnEngWord,
})

const isFill = computed<boolean>(
  () => {
    return [LearnEngWordQuesType.FILL, LearnEngWordQuesType.FILL_VIDEO].includes(formData.value.quesType)
  },
)
</script>

<template>
  <div class="mb-4 border-[rgba(255,0,0,.2)] border-dashed p-4">
    <van-field
      v-model="formData.num"
      label="题目数量"
      placeholder="题目数量"
      type="number"
      clearable
      :rules="[{ required: true, message: '请填写题目数量' }]"
      @update:model-value="onUpdate"
    />

    <van-field label="单词难度">
      <template #input>
        <base-tag-select
          v-model="formData.level"
          :list="WordLevels"
          @update:model-value="onUpdate"
        />
      </template>
    </van-field>

    <van-field label="题目类型">
      <template #input>
        <base-tag-select
          v-model="formData.quesType"
          tag-cls="text-14 min-w-80 mb-4"
          :list="EngWordQuesTypes"
          @update:model-value="onUpdate"
        />
      </template>
    </van-field>

    <van-field
      v-if="!isFill"
      v-model="formData.selectNum"
      label="选项数量"
      placeholder="选项数量"
      type="number"
      clearable
      :rules="[{ required: true, message: '请填写选项数量' }]"
      @update:model-value="onUpdate"
    />

    <van-field v-if="isFill" label="填空难度">
      <template #input>
        <base-tag-select
          v-model="formData.fillLevel"
          tag-cls="text-14 min-w-80 mb-4"
          :list="EngWordQuesFillLevels"
          @update:model-value="onUpdate"
        />
      </template>
    </van-field>
  </div>
</template>

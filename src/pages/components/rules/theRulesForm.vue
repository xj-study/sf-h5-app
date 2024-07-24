<script setup lang="ts">
import thePoint24RulesForm from './thePoint24RulesForm.vue'
import theLearnEngWordForm from './theLearnEngWordForm.vue'
import { type RuleOption, RulesTypeOptions } from './typing'
import useRulesType from './useRulesType'

interface Props {
  label: string
  rulesTypeOptions?: RuleOption[]

}

const props = withDefaults(defineProps<Props>(), {
  rulesTypeOptions: () => RulesTypeOptions,
})

const type = defineModel<number>('type')
const rules = defineModel<string>('rules')

const { isTypePoint24, isTypeLearnEngWord } = useRulesType(props)
</script>

<template>
  <div>
    <van-field label="类型" :border="false">
      <template #input>
        <van-radio-group v-model="type">
          <van-radio v-for="item in rulesTypeOptions" :key="item.name" class="mt-10" :name="item.name">
            {{ item.label }}
          </van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <thePoint24RulesForm v-if="isTypePoint24" v-model="rules" />
    <theLearnEngWordForm v-if="isTypeLearnEngWord" v-model="rules" />
  </div>
</template>

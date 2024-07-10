<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' },
})
const emits = defineEmits(['update:modelValue'])
const formData = ref(null)
watchEffect(() => {
  let data = { count: 4 }
  if (props.modelValue) {
    data = JSON.parse(props.modelValue)
  }
  formData.value = data
})
function onUpdateModelValue() {
  emits('update:modelValue', JSON.stringify(formData.value))
}
</script>

<template>
  <div>
    <van-field
      v-model="formData.count"
      label="题目数量"
      placeholder="题目数量"
      clearable
      :rules="[{ required: true, message: '请填写题目数量' }]"
      @update:model-value="onUpdateModelValue"
    />
  </div>
</template>

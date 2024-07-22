<script setup lang="ts">
interface Props {
  input: string
  placeholder?: string
  inputProps?: object
}
const props = withDefaults(defineProps<Props>(), {
  input: '',
  placeholder: '请输入',
  inputProps: null,
})
const emits = defineEmits(['update:input', 'change', 'focus'])

const focus = ref(false)

let timer = null
// 搜索节流
function onSearch(val) {
  emits('update:input', val)
  if (timer) {
    clearTimeout(timer)
  }
  if (val === props.input)
    return
  timer = setTimeout(async () => {
    emits('change', val)
  }, 500)
}

function onClear() {
  emits('change', '')
}

function onFocus() {
  updateFocus(true)
}

function onBlur() {
  updateFocus(false)
}

function updateFocus(val) {
  focus.value = val
  emits('focus', focus.value)
}

function formatter(value) {
  return value.replace(/\s/g, '')
}
</script>

<template>
  <div class="flex items-center p-x-10 p-y-8 leading-36">
    <div class="grow rounded-20 bg-[rgba(0,0,0,0.03)]">
      <div class="flex">
        <van-icon name="search" class="m-x-10 text-20 text-gray leading-36" />
        <van-field
          class="h-36 bg-transparent p-0 pr-8 leading-36"
          v-bind="inputProps"
          :model-value="input"
          :placeholder="placeholder"
          clearable
          :formatter="formatter"
          @focus="onFocus"
          @blur="onBlur"
          @clear="onClear"
          @update:model-value="onSearch"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  itemData: { type: Object },
})

const emits = defineEmits(['confirm'])

const form = reactive<{ title: string, content: string }>({ title: '', content: '' })

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
        name="任务标题"
        label="任务标题"
        placeholder="任务标题"
        clearable
        :rules="[{ required: true, message: '请填写任务标题' }]"
      />
      <van-field
        v-model="form.content"
        type="textarea"
        rows="2"
        name="任务内容"
        label="任务内容"
        placeholder="任务内容"
        clearable
        :rules="[{ required: true, message: '请填写任务内容' }]"
      />
    </van-cell-group>
    <div class="m-16">
      <base-button :inline="false" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

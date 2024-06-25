<script setup lang="ts">
const title = ref('')
const content = ref('')
function onSubmit() {

}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="title"
        name="任务标题"
        label="任务标题"
        placeholder="任务标题"
        clearable
        :rules="[{ required: true, message: '请填写任务标题' }]"
      />
      <van-field
        v-model="content"
        type="textarea"
        rows="2"
        name="任务内容"
        label="任务内容"
        placeholder="任务内容"
        clearable
        :rules="[{ required: true, message: '请填写任务内容' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

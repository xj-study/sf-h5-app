<script setup lang="ts">
import type { UserInfo } from '../typing'
import useUserStore from '@/stores/modules/user'

defineProps({
  confirmLoading: { type: Boolean, default: false },
})

const emits = defineEmits(['confirm'])
const { user } = useUserStore()

const form = ref<UserInfo>({})

watchEffect(() => {
  form.value.nickname = user.userName
})

function onSubmit() {
  emits('confirm', form.value)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="form.nickname"

        label="昵称"
        placeholder="昵称"
        clearable
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="form.password"

        label="密码"
        placeholder="密码"
        type="password"
        clearable
      />
    </van-cell-group>
    <div class="m-16">
      <base-button :inline="false" :loading="confirmLoading" class="w-full" type="primary" native-type="submit">
        确认
      </base-button>
    </div>
  </van-form>
</template>

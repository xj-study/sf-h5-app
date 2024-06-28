<script setup lang="ts">
import { showToast } from 'vant'
import useUserStore from '@/stores/modules/user'

definePage({
  name: 'login',
  meta: {
    level: 2,
    common: true,
  },
})

const userName = ref('')
const password = ref('')
const userStore = useUserStore()

const router = useRouter()
async function onSubmit() {
  await userStore.toLogin({
    userName: userName.value,
    password: password.value,
  })

  showToast('登录成功')
  router.back()
}
</script>

<template>
  <base-container :padding-x="0">
    <van-form @submit="onSubmit">
      <van-cell-group inset class="pt-16">
        <van-field
          v-model="userName"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </base-container>
</template>

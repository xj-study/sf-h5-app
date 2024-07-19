<script setup lang="ts">
import { showToast } from 'vant'
import useUserStore from '@/stores/modules/user'
import { registerUser } from '@/api/userApi'

enum Type {
  LOGIN = 0,
  REGISTER = 1,
}

definePage({
  name: 'login',
  meta: {
    level: 2,
    common: true,
  },
})

const userName = ref('')
const password = ref('')
const confirmPassword = ref('')
const userStore = useUserStore()

const router = useRouter()

const type = ref(Type.LOGIN)
const isTypeLogin = computed(() => type.value === Type.LOGIN)
const title = computed(() => {
  return isTypeLogin.value ? '欢迎登录' : '用户注册'
})
const submitText = computed(() => {
  return isTypeLogin.value ? '登录' : '注册'
})
async function onSubmit() {
  if (isTypeLogin.value) {
    await userStore.toLogin({
      userName: userName.value,
      password: password.value,
    })

    showToast('登录成功')
    router.back()
  } else {
    //  注册
    await registerUser({
      name: userName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })

    showToast('注册成功, 2s 后自动登录')

    type.value = Type.LOGIN

    setTimeout(() => {
      onSubmit()
    }, 2000)
  }
}

function toRegister() {
  type.value = Type.REGISTER
}
function backLogin() {
  type.value = Type.LOGIN
}
</script>

<template>
  <base-container :padding-x="0" class="pt-50">
    <h2 class="text-center">
      {{ title }}
    </h2>
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
        <van-field
          v-if="!isTypeLogin"
          v-model="confirmPassword"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写确认密码' }]"
        />
      </van-cell-group>
      <div class="mx16 mt40 flex">
        <base-button block type="primary" class="glow" native-type="submit">
          {{ submitText }}
        </base-button>
      </div>
      <div class="mt20 text-center">
        <base-text-link v-if="isTypeLogin" @click="toRegister">
          注册
        </base-text-link>
        <base-text-link v-if="!isTypeLogin" @click="backLogin">
          返回登录
        </base-text-link>
      </div>
    </van-form>
  </base-container>
</template>

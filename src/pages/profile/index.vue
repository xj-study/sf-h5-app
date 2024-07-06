<script setup lang="ts">
import { showToast } from 'vant'
import { TaskStatus } from '../task/types'
import TheUserInfoForm from './components/theUserInfoForm.vue'
import type { UserInfo } from './typing'
import { queryUserChildren, updateUser } from '@/api/userApi'
import useUserStore from '@/stores/modules/user'
import useLoading from '@/hooks/useLoading'

definePage({
  name: 'profile',
  meta: {
    level: 1,
    title: '我的',
    tabbar: true,
  },
})

const { parentTypeFlag, user, loginOut, updateIntegral, updateUserInfo } = useUserStore()
const router = useRouter()
const userChildren = ref([])

onMounted(() => {
  queryChildren()
  updateIntegral()
})

async function queryChildren() {
  if (parentTypeFlag) {
    const list = await queryUserChildren()
    userChildren.value = list
  }
}

const userInfoShow = ref(false)
function toChangeUserInfo() {
  userInfoShow.value = true
}

const { loadingFlag, loading: onConfirm } = useLoading(async (item: UserInfo) => {
  await updateUser(item)
  await updateUserInfo()
  userInfoShow.value = false
})

function toTaskList(tab) {
  router.push(`/task?tab=${tab}`)
}
function toChildrenTaskList(id: number) {
  router.push(`/profile/child?id=${id}`)
}
function toCustomTask() {
  router.push('/task/custom')
}
function toCustomGift() {
  router.push('/gift/custom')
}
function toCustomStory() {
  showToast('功能正在开发中，敬请期待')
}
function toCustomWords() {
  showToast('功能正在开发中，敬请期待')
}
// 退出登录
function toLoginOut() {
  loginOut()
}
function toIntegralRecord() {
  router.push('/record/integral')
}
function toGift() {
  router.push('/gift')
}
function toGame() {
  router.push('/game')
}
</script>

<template>
  <base-container :padding-x="0">
    <div class="m-10 mt-20">
      <div class="flex items-center">
        <van-image
          round
          class="h-100 w-100"
          fit="cover"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="ml-10 flex-1 text-20">
          <div class="flex items-center justify-between">
            <span> {{ user.userName }}</span>
            <base-text-link @click="toChangeUserInfo">
              修改个人信息
            </base-text-link>
          </div>

          <div v-if="!parentTypeFlag" class="mt-10 flex items-center justify-between">
            <div class="">
              <span class="text-20 text-amber-500">{{ user.integral || 0 }}</span>
              <span class="pl-8 text-12">积分</span>
            </div>
            <base-text-link @click="toIntegralRecord">
              查看积分明细
            </base-text-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!parentTypeFlag">
      <base-cell-head title="我的任务">
        <base-button plain type="primary" size="normal" @click="toTaskList(TaskStatus.INIT)">
          待完成
        </base-button>
        <base-button v-if="!parentTypeFlag" class="ml-10" plain type="primary" size="normal" @click="toTaskList(TaskStatus.WATIT_VERIFY)">
          待审核
        </base-button>
        <base-button class="ml-10" plain type="primary" size="normal" @click="toTaskList(TaskStatus.COMPLETE)">
          已完成
        </base-button>
      </base-cell-head>

      <base-cell-head title="开心一刻">
        <base-button plain type="primary" size="normal" @click="toGift">
          礼物中心
        </base-button>
        <base-button class="ml-10" plain type="primary" size="normal" @click="toGame">
          益智小游戏
        </base-button>
      </base-cell-head>
    </div>

    <div v-if="parentTypeFlag">
      <base-cell-head title="我的孩子">
        <base-button v-for="item in userChildren" :key="item.id" plain type="primary" size="normal" @click="toChildrenTaskList(item.id)">
          {{ item.nickname }}
        </base-button>
      </base-cell-head>
      <base-cell-head title="我的工具">
        <div class="flex flex-wrap *:m-4">
          <base-button plain type="primary" size="normal" @click="toCustomTask">
            定制任务
          </base-button>
          <base-button plain type="primary" size="normal" @click="toCustomGift">
            定制礼物
          </base-button>
          <base-button plain type="primary" size="normal" @click="toCustomStory">
            定制故事
          </base-button>
          <base-button plain type="primary" size="normal" @click="toCustomWords">
            词库
          </base-button>
        </div>
      </base-cell-head>
    </div>
    <div class="m-x-10 mt50">
      <base-button block @click="toLoginOut">
        退出登录
      </base-button>
    </div>

    <base-popup v-model:show="userInfoShow">
      <TheUserInfoForm :confirm-loading="loadingFlag" @confirm="onConfirm" />
    </base-popup>
  </base-container>
</template>

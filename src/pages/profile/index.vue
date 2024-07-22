<script setup lang="ts">
import { showToast } from 'vant'

import TheUserInfoForm from './components/theUserInfoForm.vue'
import TheAddChildForm from './components/theAddChildForm.vue'
import type { UserInfo } from './typing'
import { addChild, queryUserChildren, updateUser } from '@/api/userApi'
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

const addChildShow = ref(false)
function toAddChild() {
  addChildShow.value = true
}

const { loadingFlag: addChildLoading, loading: onAddChildConfirm } = useLoading(async (item: UserInfo) => {
  const result = await addChild(item)
  userChildren.value.push(result)
  showToast('添加成功')
  addChildShow.value = false
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
  router.push('/story/custom')
}
function toCustomWords() {
  router.push('/words/custom')
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
function toStory() {
  router.push('/story')
}
function toGame() {
  router.push('/game')
}
</script>

<template>
  <base-container :padding-x="0" class="min-h-screen">
    <div class="p-20">
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
      <div class="m-auto mt-50 h-100 w-100 rounded-full bg-blue text-center text-white leading-100" @click="toTaskList(0)">
        去打卡
      </div>

      <base-cell-head center>
        <base-button plain type="primary" class="w-80 p-x-10" size="normal" @click="toStory">
          活动<br>中心
        </base-button>
        <base-button class="ml10 w-80 p-x-10" plain type="primary" size="normal" @click="toGift">
          礼物<br>中心
        </base-button>
        <base-button class="ml-10 w-80 p-x-10" plain type="primary" size="normal" @click="toGame">
          益智<br>小游戏
        </base-button>
        <base-button class="ml-10" plain type="primary" size="normal" @click="toCustomWords">
          词库
        </base-button>
      </base-cell-head>
    </div>

    <div v-if="parentTypeFlag">
      <base-cell-head title="我的孩子">
        <base-button v-for="item in userChildren" :key="item.id" plain type="primary" class="mr10" size="normal" @click="toChildrenTaskList(item.id)">
          {{ item.nickname }}
        </base-button>
        <base-button v-if="userChildren.length === 0" icon="plus" plain type="primary" size="normal" @click="toAddChild">
          添加孩子
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
            定制活动
          </base-button>
          <base-button plain type="primary" size="normal" @click="toCustomWords">
            词库
          </base-button>
        </div>
      </base-cell-head>
    </div>

    <div class="fixed bottom-80 w-full p-x-20">
      <base-button block type="primary" @click="toLoginOut">
        退出登录
      </base-button>
    </div>

    <base-popup v-model:show="userInfoShow">
      <TheUserInfoForm :confirm-loading="loadingFlag" @confirm="onConfirm" />
    </base-popup>
    <base-popup v-model:show="addChildShow">
      <TheAddChildForm :confirm-loading="addChildLoading" @confirm="onAddChildConfirm" />
    </base-popup>
  </base-container>
</template>

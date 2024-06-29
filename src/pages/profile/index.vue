<script setup lang="ts">
import { TaskStatus } from '../task/types'
import { queryUserChildren } from '@/api/userApi'
import useUserStore from '@/stores/modules/user'

definePage({
  name: 'profile',
  meta: {
    level: 1,
    title: '我的',
    tabbar: true,
  },
})

const { parentTypeFlag, user, loginOut, updateIntegral } = useUserStore()
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
            <base-text-link @click="toLoginOut">
              退出登录
            </base-text-link>
          </div>

          <div class="mt-10 flex items-center justify-between">
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
        <base-button plain type="primary" size="normal" @click="toCustomTask">
          定制任务
        </base-button>
        <base-button class="ml-10" plain type="primary" size="normal" @click="toCustomGift">
          定制礼物
        </base-button>
      </base-cell-head>
    </div>
  </base-container>
</template>

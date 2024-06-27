<script setup lang="ts">
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

const { parentTypeFlag, user, loginOut } = useUserStore()
const router = useRouter()
const userChildren = ref([])
onMounted(async () => {
  if (parentTypeFlag) {
    const list = await queryUserChildren()
    userChildren.value = list
  }
})

function toTaskList() {
  router.push(`/task`)
}
function toChildrenTaskList(id: number) {
  router.push(`/task?id=${id}`)
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
            <span class="text-12" @click="toLoginOut">
              退出登录 >
            </span>
          </div>
          <div v-if="!parentTypeFlag">
            {{ 1000 }}
          </div>
        </div>
      </div>
    </div>

    <base-cell-head title="我的任务">
      <base-button plain type="primary" size="normal" @click="toTaskList">
        待完成
      </base-button>
      <base-button class="ml-10" plain type="primary" size="normal" @click="toTaskList">
        已完成
      </base-button>
    </base-cell-head>
    <base-cell-head v-if="parentTypeFlag" title="我的孩子">
      <base-button v-for="item in userChildren" :key="item.id" plain type="primary" size="normal" @click="toChildrenTaskList(item.id)">
        {{ item.nickname }}
      </base-button>
    </base-cell-head>
    <base-cell-head v-if="parentTypeFlag" title="我的工具">
      <base-button plain type="primary" size="normal" @click="toCustomTask">
        定制任务
      </base-button>
      <base-button class="ml-10" plain type="primary" size="normal" @click="toCustomGift">
        定制礼物
      </base-button>
    </base-cell-head>
  </base-container>
</template>

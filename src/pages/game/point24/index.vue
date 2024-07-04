<script setup lang="ts">
import TheGame from './components/thePoint24Game.vue'

definePage({
  name: 'gamePoint24',
  meta: {
    common: true,
  },
})
const startFlag = ref(false)
const practiceFlag = ref(false)
function toStart() {
  startFlag.value = true
  practiceFlag.value = false
}
function toPractice() {
  startFlag.value = true
  practiceFlag.value = true
}
</script>

<template>
  <base-container :padding-x="0">
    <!-- 规则 -->
    <base-cell-head title="游戏规则">
      <div>随机抽取 4 位 1 ~ 13 的数字，通过加减乘除四则运算，且每个数字及每两数字运算得到的数字只能使用一次，最后计算所得的一位数字为 24 时，则算游戏成功</div>
      <div class="m-y-10 font-bold">
        示例：1 1 3 8
      </div>
      <div class="text-w">
        可能运算结果：<span class="font-bold">1 × 1 × 3 × 8 = 24</span>
      </div>
    </base-cell-head>
    <div class="mt-20 p-x-10">
      <base-button type="primary" @click="toStart">
        开始游戏
      </base-button>
      <base-button class="ml10" @click="toPractice">
        练习一下
      </base-button>
    </div>
    <TheGame v-model="startFlag" :practice="practiceFlag" />
  </base-container>
</template>

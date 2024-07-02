<script setup lang="ts">
import { MAIN_PANEL_HEIGHT, MAIN_PANEL_WIDTH, NODE_SIZE, SPEED_INIT, SPEED_LEVEL_CHANGE } from './config'
import { Direction } from './constants'
import Food from './food'
import Snake from './snake'
import { addPx } from './utils'
import ScorePanel from './scorePanel'

definePage({
  name: 'gameSnake',
  meta: {
    level: 2,
  },
})

const mainPanelStyle = {
  width: addPx(MAIN_PANEL_WIDTH),
  height: addPx(MAIN_PANEL_HEIGHT),
}

const food = new Food()

const foodSubNodeStyle = computed(() => {
  const size = addPx(food.size.width / 2 - 1)
  return { width: size, height: size }
})

const snake = new Snake()

const ctrlBtnCls = 'bg-[rgba(0,0,0,.3)] rounded-3xl p-20 text-white '
const direction = ref(Direction.INIT)
const isAlive = ref(true)
const isGameOver = ref(false)
watch(isAlive, () => {
  isGameOver.value = !isAlive.value
})
const isStop = ref(false)
// const resetText = computed(() => {
//   if (!isAlive.value) {
//     return '重置'
//   }
//   return isStop.value ? '开始' : '暂停'
// })
// const resetVisible = computed(() => direction.value !== Direction.INIT)

function changeDirection(value: Direction) {
  if (isStop.value)
    return

  if (direction.value === Direction.INIT)
    startGame()

  direction.value = value
}

const scorePanel = new ScorePanel()

const currentSpeed = computed(() => {
  const speed = SPEED_INIT - (scorePanel.level - 1) * SPEED_LEVEL_CHANGE

  return speed
})
function startGame() {
  run()
}
function run() {
  if (!isAlive.value)
    return
  if (isStop.value)
    return
  setTimeout(() => {
    let newX = snake.x
    let newY = snake.y
    switch (direction.value) {
      case Direction.UP:
        newY -= NODE_SIZE
        break
      case Direction.DOWN:
        newY += NODE_SIZE
        break
      case Direction.LEFT:
        newX -= NODE_SIZE
        break
      case Direction.RIGHT:
        newX += NODE_SIZE
        break
    }

    // 移动
    try {
      snake.move(newX, newY)
    } catch (error) {
      // showToast(`${error.message}，游戏结束！`)
      isAlive.value = false
    }

    // 判断是否吃到食物了
    hitFood()

    run()
  }, currentSpeed.value)
}

function hitFood() {
  const isHit = snake.x === food.x && snake.y === food.y
  if (!isHit)
    return

  snake.eat(1)
  food.change()
  scorePanel.increaseScore(1)
}

function resetGame() {
  if (isAlive.value) {
    isStop.value = !isStop.value
    if (!isStop.value) {
      run()
    }
    return
  }

  scorePanel.reset()

  snake.reset()
  food.change()
  direction.value = Direction.INIT

  isAlive.value = true
}
</script>

<template>
  <div class="h-screen bg-[#90b4b8] pt-10">
    <van-popup v-model:show="isGameOver" class="bg-transparent" :close-on-click-overlay="false">
      <div class="text-center">
        <div class="rounded-[10px] bg-[rgba(255,255,255,0.5)] p-20 color-white">
          GAME OVER
        </div>
        <base-button plain class="m-x-auto mt-10" size="small bg-transparent text-white" @click="resetGame">
          再来一次
        </base-button>
      </div>
    </van-popup>

    <!-- 主盘 -->
    <div :style="mainPanelStyle" class="relative m-auto m-y-10 box-content border-1 border-[#333] border-solid">
      <!-- 蛇 -->
      <div>
        <div v-for="node, index in snake.nodes.value" :key="index" class="absolute border-1 border-[#90b4b8] border-solid bg-black" :style="node.style" />
      </div>
      <div class="absolute flex flex-wrap justify-between" :style="food.style">
        <div v-for="i in 4" :key="i" class="padding-1 rotate-45 border-1 bg-black" :style="foodSubNodeStyle" />
      </div>
    </div>
    <div class="m-x-30 m-y-10 flex justify-between">
      <div>
        <span class="pr-8 font-bold">SCORE:</span>
        <span>{{ scorePanel.score }}</span>
      </div>
      <div>
        <span class="pr-8 font-bold">LEVEL:</span>
        <span>{{ scorePanel.level }}</span>
      </div>
    </div>
    <div class="m-auto w-280 text-center">
      <div class="m-auto block" :class="ctrlBtnCls" @click="changeDirection(Direction.UP)">
        上
      </div>
      <div class="m-y-10 flex">
        <div :class="ctrlBtnCls" class="inline-block flex-1" @click="changeDirection(Direction.LEFT)">
          左
        </div>
        <div :class="ctrlBtnCls" class="ml-10 inline-block flex-1" @click="changeDirection(Direction.RIGHT)">
          右
        </div>
      </div>
      <div :class="ctrlBtnCls" class="block" @click="changeDirection(Direction.DOWN)">
        下
      </div>
    </div>
  </div>
</template>

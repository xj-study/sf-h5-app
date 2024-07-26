<script setup lang="ts">
const emits = defineEmits(['input', 'del'])
const line1 = 'qwertyuiop'
const line2 = 'adsfghjkl'
const line3 = 'xzcvbnm'
const DEL = 'Del'
const btnCls = 'text-center btn-k p-x-4 min-w-24 h-40 border-1 border-solid border-[rgba(255,255,255,.3)] text-[rgba(255,255,255,.8)] active:bg-[rgba(255,255,255,.2)] m-4 text-30'
function onClick(evt: PointerEvent) {
  const target: HTMLElement = evt.target as HTMLElement
  if (target.classList.contains('btn-k')) {
    const input = target.textContent
    if (input === DEL) {
      emits('del')
    } else {
      emits('input', input)
    }
  }
}
</script>

<template>
  <div class="mt-20 border-.5 border-[rgba(255,255,255,0.2)] border-x-transparent border-solid p-y-20" @click="onClick">
    <div class="flex justify-center">
      <div v-for="c in line1" :key="c" :class="btnCls">
        {{ c }}
      </div>
    </div>
    <div class="flex justify-center">
      <div v-for="c in line2" :key="c" :class="btnCls">
        {{ c }}
      </div>
    </div>
    <div class="flex justify-center">
      <div v-for="c in line3" :key="c" :class="btnCls">
        {{ c }}
      </div>
      <div :class="btnCls">
        {{ DEL }}
      </div>
    </div>
  </div>
</template>

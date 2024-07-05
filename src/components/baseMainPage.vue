<script setup lang="ts">
interface Props {
  getList: () => Promise<any>
  paddingX?: number
}
defineProps<Props>()

const listRef = ref()

defineExpose({
  listRef,
})
</script>

<template>
  <base-container :padding-x="paddingX">
    <base-head-tool>
      <slot name="head-tool" />
    </base-head-tool>

    <base-refresh-list ref="listRef" class="min-h-70vh" :get-list="getList">
      <template #default="{ itemData }">
        <slot :item-data="itemData" />
      </template>
    </base-refresh-list>
    <slot name="popup" />
  </base-container>
</template>

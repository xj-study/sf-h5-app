<script setup lang="ts">
interface Props {
  getList: () => Promise<any>
  paddingX?: number
  headToolPadding?: boolean
}
withDefaults(defineProps<Props>(), {
  paddingX: 0,
  headToolPadding: true,
})

const listRef = ref()

defineExpose({
  listRef,
})
</script>

<template>
  <base-container :padding-x="paddingX">
    <base-head-tool :padding="headToolPadding">
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

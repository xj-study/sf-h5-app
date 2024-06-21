<script setup lang="ts">


const route = useRoute()
const router = useRouter()

function onBack() {
  if (window.history.state.back)
    history.back()
  else
    router.replace('/')
}

const { t } = useI18n()

const title = computed(() => {
  console.log('test title start');
  if (!route.meta)
    return ''

  let result =  route.meta.i18n ? t(route.meta.i18n) : (route.meta.title || '')
  console.log('test title', result);
  return result
})
</script>

<template>
  <VanNavBar
    v-show="title"
    :title="title"
    :fixed="true"
    clickable left-arrow
    @click-left="onBack"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTheme } from './composables/useTheme'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const { initTheme } = useTheme()
const route = useRoute()
const router = useRouter()
const isReady = ref(false)

const showLayout = computed(() => {
  if (!isReady.value) return false
  return !route.meta.hideLayout
})

onMounted(() => {
  initTheme()

  // Wait for router to be ready before showing content
  router.isReady().then(() => {
    isReady.value = true
  })
})
</script>

<template>
  <div v-if="!isReady" class="loading-container">
    <!-- Optional: Add a loading spinner here if desired -->
  </div>

  <div v-else-if="showLayout" class="app-layout">
    <Sidebar />
    <main>
      <Header />
      <section>
        <router-view />
      </section>
    </main>
  </div>

  <template v-else>
    <router-view />
  </template>
</template>

<style scoped>
.loading-container {
  min-height: 100vh;
  background: var(--bg-tertiary);
}

.app-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  background: var(--bg-tertiary);

  main {
    padding: 0 24px;
    flex: 1;
  }
}
</style>

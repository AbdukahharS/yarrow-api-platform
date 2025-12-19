<script setup lang="ts">
import LogoSquare from '../assets/logo-square.svg'
import Template from '../assets/icons/template.svg?component'
import Key from '../assets/icons/key.svg?component'
import BarChart from '../assets/icons/bar-chart.svg?component'
import CreaditCard from '../assets/icons/credit-card.svg?component'
import Question from '../assets/icons/question-circle.svg?component'
import { useRoute } from 'vue-router'

const route = useRoute()

const pages = [
  { name: 'Dashboard', icon: Template, route: '/' },
  { name: 'API Keys', icon: Key, route: '/api-keys' },
  { name: 'Usage / Analytics', icon: BarChart, route: '/usage-analytics' },
  { name: 'Billing', icon: CreaditCard, route: '/billing' },
  { name: 'Support', icon: Question, route: '/support' },
]
</script>

<template>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">
        <img :src="LogoSquare" alt="Logo" />
        <h1>API Platform</h1>
      </div>
      <div class="navigation">
        <router-link
          v-for="page in pages"
          :key="page.name"
          :to="page.route"
          :class="['nav-link', { active: route.path === page.route }]"
        >
          <component :is="page.icon" class="icon" />
          <span>{{ page.name }}</span>
        </router-link>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 260px;

  aside {
    width: 260px;
    background: var(--bg-primary);
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    border-right: 1px solid var(--border-color);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    padding: 24px 14px;

    .navigation {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 24px;

      .nav-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 10px 8px;
        position: relative;
        text-decoration: none;
        transition: all 0.2s ease;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 400;

        &:not(.active) {
          color: var(--text-primary);

          &:hover {
            background: color-mix(in srgb, var(--primary-color) 10%, transparent);
          }

          .icon {
            color: var(--text-tertiary);
          }
        }

        &.active {
          background: color-mix(in srgb, var(--primary-color) 10%, transparent);
          color: var(--primary-color);

          &::before {
            content: '';
            position: absolute;
            left: 0px;
            top: 0;
            bottom: 0;
            width: 4px;
            background: var(--primary-color);
            border-radius: 0 4px 4px 0;
          }
        }

        .icon {
          width: 20px;
          height: 20px;
        }
      }
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;

      h1 {
        color: var(--primary-color);
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
}
</style>

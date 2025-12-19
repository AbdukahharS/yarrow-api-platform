<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

import Key from '../assets/icons/key.svg?component'
import Book from '../assets/icons/book.svg?component'
import CreditCard from '../assets/icons/credit-card.svg?component'
import TrendingUp from '../assets/icons/tending-up.svg?component'

const { logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/signin')
}
</script>

<template>
  <div class="dashboard">
    <div class="quick-cards">
      <div class="card plan">
        <span class="card-title">Current Plan</span>
        <div class="content">
          <div class="top">
            <span class="plan-name"> Pro </span>
            <span class="status">Active</span>
          </div>
          <span class="price">$299<small>/mo</small></span>
          <span class="limit">1,000,000 requests/month</span>
          <div class="usage">
            <div class="text">Usage: 782k / 1M (78%)</div>
            <div class="progress-bar">
              <div class="progress" :style="{ width: '78%' }"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card actions">
        <span class="card-title">Quick Actions</span>
        <div class="content">
          <button><Key class="icon" /> Create API Key</button>
          <button><Book class="icon" /> View Docs</button>
          <button><CreditCard class="icon" /> Billing</button>
        </div>
      </div>
      <div class="card total-requests">
        <span class="card-title">Total Requests</span>
        <div class="content">
          <p class="stat">782,456</p>
          <div class="delta">
            <TrendingUp class="icon" />+12.5% from last month
          </div>
        </div>
      </div>
      <div class="card apis">
        <span class="card-title">Active API Keys</span>
        <p class="total">5</p>
        <p class="desc">2 restricted, 3 unrestricted</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 24px 0;

  .quick-cards {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 24px;

    .card {
      flex: 1;
      background: var(--bg-primary);
      border-radius: 14px;
      padding: 24px;
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;

      .card-title {
        color: var(--text-primary);
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 30px;
        display: block;
      }

      &.apis {
        .total {
          font-size: 32px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        .desc {
          font-size: 14px;
          font-weight: 400;
          color: var(--text-tertiary);
        }
      }

      &.total-requests .content {
        .stat {
          font-size: 32px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .delta {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 400;
          color: var(--success-color);

          .icon {
            width: 16px;
            height: 16px;
            color: var(--success-color);
          }
        }
      }

      &.actions .content {
        display: flex;
        flex-direction: column;
        gap: 8px;

        button {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: 12px;
          border-radius: 8px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          gap: 14px;
          font-weight: 500;
          font-size: 14px;
          color: var(--text-primary);
          transition: all 0.2s ease-in-out;

          &:hover {
            background: var(--bg-secondary);
          }

          .icon {
            width: 16px;
            height: 16px;
            color: var(--text-primary);
          }
        }
      }

      .content {
        flex: 1;
      }

      &.plan {
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .plan-name {
            color: var(--primary-color);
            font-weight: 400;
            font-size: 16px;
          }

          .status {
            display: inline-block;
            font-weight: 500;
            font-size: 12px;
            color: var(--bg-secondary);
            background: var(--success-color);
            padding: 2px 8px;
            border-radius: 8px;
          }
        }

        .price {
          color: var(--text-primary);
          font-weight: 400;
          font-size: 24px;
          display: block;
          margin-bottom: 8px;

          small {
            font-size: 14px;
            color: var(--text-tertiary);
          }
        }

        .limit {
          color: var(--text-tertiary);
          font-size: 14px;
          font-weight: 400;
          display: block;
          margin-bottom: 16px;
        }

        .usage {
          .text {
            font-size: 12px;
            font-weight: 400;
            color: var(--text-tertiary);
            margin-bottom: 4px;
          }

          .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--bg-secondary);
            border-radius: 4px;
            overflow: hidden;

            .progress {
              height: 100%;
              background: var(--primary-color);
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import CreditCardIcon from '../assets/icons/credit-card.svg?component'
import DownloadIcon from '../assets/icons/download.svg?component'

interface Invoice {
  id: string
  date: string
  amount: string
  plan: string
  status: string
}

const invoices = ref<Invoice[]>([
  {
    id: 'INV-2024-12',
    date: 'Dec 1, 2024',
    amount: '$299.00',
    plan: 'Pro',
    status: 'paid',
  },
  {
    id: 'INV-2024-11',
    date: 'Nov 1, 2024',
    amount: '$299.00',
    plan: 'Pro',
    status: 'paid',
  },
  {
    id: 'INV-2024-10',
    date: 'Oct 1, 2024',
    amount: '$149.00',
    plan: 'Starter',
    status: 'paid',
  },
  {
    id: 'INV-2024-09',
    date: 'Sep 1, 2024',
    amount: '$149.00',
    plan: 'Starter',
    status: 'paid',
  },
  {
    id: 'INV-2024-08',
    date: 'Aug 1, 2024',
    amount: '$149.00',
    plan: 'Starter',
    status: 'paid',
  },
])

const downloadInvoice = (invoiceId: string) => {
  console.log('Downloading invoice:', invoiceId)
}
</script>

<template>
  <div class="billing">
    <h2 class="page-title">Billing</h2>
    <p class="page-desc">Manage your subscription and billing information</p>
    <div class="current-subscription">
      <h3>Current Subscription</h3>
      <h4>Your active plan and usage</h4>
      <div class="stack">
        <div class="details">
          <span class="plan">Current Plan</span>
          <span class="plan-name">Pro</span>
          <span class="price"> $299.00 / month </span>
          <button>Change Plan</button>
        </div>
        <div class="dates">
          <p class="date-title">Billing Period</p>
          <p class="date-value">Dec 1 - Dec 31, 2024</p>
          <p class="date-title">Next billing date</p>
          <p class="date-value">Jan 1, 2025</p>
        </div>
        <div class="usage">
          <p class="usage-title">Usage vs Quota</p>
          <div class="progress">
            <div class="texts">
              <span>Requests</span>
              <span>782,456 / 1,000,000</span>
            </div>
            <div class="bar">
              <div
                class="bar-progress"
                :style="{ width: `${782456 / 10000}%` }"
              ></div>
            </div>
          </div>
          <div class="progress">
            <div class="texts">
              <span>API Keys</span>
              <span>5 / 100</span>
            </div>
            <div class="bar">
              <div
                class="bar-progress"
                :style="{ width: `${(5 / 100) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="available-plans">
      <h3>Available Plans</h3>
      <div class="plans-grid">
        <div class="plan-card">
          <div class="plan-header">
            <h4 class="plan-name">Starter</h4>
            <p class="plan-description">
              Perfect for small projects and testing
            </p>
          </div>
          <div class="plan-price">
            <span class="amount">$49</span>
            <span class="period">/month</span>
          </div>
          <ul class="plan-features">
            <li>100,000 requests/month</li>
            <li>5 API keys</li>
            <li>Basic analytics</li>
            <li>Email support</li>
            <li>99.9% uptime SLA</li>
          </ul>
          <button class="plan-button upgrade">Upgrade</button>
        </div>

        <div class="plan-card featured">
          <div class="plan-badges">
            <span class="badge popular">Most Popular</span>
            <span class="badge current">Current Plan</span>
          </div>
          <div class="plan-header">
            <h4 class="plan-name">Pro</h4>
            <p class="plan-description">
              For growing businesses and applications
            </p>
          </div>
          <div class="plan-price">
            <span class="amount">$299</span>
            <span class="period">/month</span>
          </div>
          <ul class="plan-features">
            <li>1,000,000 requests/month</li>
            <li>Unlimited API keys</li>
            <li>Advanced analytics</li>
            <li>Priority support</li>
            <li>99.99% uptime SLA</li>
            <li>Custom rate limits</li>
          </ul>
          <button class="plan-button current-plan">Current Plan</button>
        </div>

        <div class="plan-card">
          <div class="plan-header">
            <h4 class="plan-name">Enterprise</h4>
            <p class="plan-description">For large-scale applications</p>
          </div>
          <div class="plan-price">
            <span class="amount custom">Custom</span>
          </div>
          <ul class="plan-features">
            <li>Unlimited requests</li>
            <li>Unlimited API keys</li>
            <li>Real-time analytics</li>
            <li>Dedicated support</li>
            <li>99.999% uptime SLA</li>
            <li>Custom integrations</li>
            <li>On-premise deployment</li>
          </ul>
          <button class="plan-button contact">Contact Sales</button>
        </div>
      </div>
    </div>

    <div class="payment-method">
      <h3>Payment Method</h3>
      <p class="section-desc">Manage your payment information</p>
      <div class="card-info">
        <div class="card-icon">
          <CreditCardIcon />
        </div>
        <div class="card-details">
          <span class="card-number">Visa ending in 4242</span>
          <span class="card-expiry">Expires 12/2025</span>
        </div>
        <button class="update-btn">Update</button>
      </div>
    </div>

    <div class="invoice-history">
      <h3>Invoice History</h3>
      <p class="section-desc">Download your past invoices</p>
      <table class="invoices-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.id }}</td>
            <td>{{ invoice.date }}</td>
            <td>{{ invoice.amount }}</td>
            <td>{{ invoice.plan }}</td>
            <td>
              <span class="status-badge paid">{{ invoice.status }}</span>
            </td>
            <td>
              <button class="download-btn" @click="downloadInvoice(invoice.id)">
                <DownloadIcon />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.billing {
  padding: 24px 0;

  .page-title {
    font-size: 24px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 4px;
  }

  .page-desc {
    font-weight: 400;
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 24px;
  }

  .current-subscription {
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 25px;

    h3 {
      font-weight: 500;
      font-size: 18px;
      color: var(--text-primary);
      margin-bottom: 28px;
    }

    h4 {
      color: var(--text-secondary);
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 2px;
    }

    .stack {
      display: flex;
      flex-direction: row;
      gap: 16px;
      justify-content: space-between;

      .usage {
        width: clamp(250px, 100%, 350px);

        .usage-title {
          font-weight: 400;
          color: var(--text-secondary);
          font-size: 16px;
        }

        .progress {
          .texts {
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            font-size: 14px;
            margin-bottom: 3px;
            margin-top: 10px;
          }
          .bar {
            height: 8px;
            background: color-mix(
              in srgb,
              var(--text-primary) 15%,
              transparent
            );
            width: 100%;
            border-radius: 4px;
            overflow: hidden;

            .bar-progress {
              height: 100%;
              background: var(--text-primary);
            }
          }
        }
      }

      .details {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .plan {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .plan-name {
          font-size: 24px;
          font-weight: 400;
          color: var(--text-primary);
        }

        .price {
          font-size: 14px;
          color: var(--text-secondary);
        }

        button {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          font-weight: 500;
          font-size: 16px;
          color: var(--text-primary);
          border-radius: 8px;
          margin-top: 16px;
          transition: box-shadow 0.2s ease-in-out;

          &:hover {
            box-shadow: var(--shadow-sm);
          }
        }
      }

      .dates {
        .date-title {
          font-weight: 400;
          font-size: 16px;
          color: var(--text-secondary);
        }

        .date-value {
          font-weight: 500;
          font-size: 16px;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
      }
    }
  }

  .available-plans {
    margin-top: 24px;

    h3 {
      font-weight: 500;
      font-size: 18px;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;

      .plan-card {
        background-color: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 14px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        position: relative;

        &.featured {
          border: 2px solid #ff6900;
          padding-top: 40px;
        }

        .plan-badges {
          position: absolute;
          top: 0;
          left: 66.66%;
          transform: translateX(-50%) translateY(-40%);
          display: flex;
          gap: 30px;

          .badge {
            padding: 4px 12px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;

            &.popular {
              background-color: #ff6900;
              color: white;
            }

            &.current {
              background-color: var(--text-primary);
              color: var(--bg-primary);
            }
          }
        }

        .plan-header {
          margin-bottom: 16px;

          .plan-name {
            font-size: 20px;
            font-weight: 500;
            color: var(--text-primary);
            margin-bottom: 4px;
          }

          .plan-description {
            font-size: 14px;
            color: var(--text-secondary);
          }
        }

        .plan-price {
          margin-bottom: 20px;

          .amount {
            font-size: 36px;
            font-weight: 500;
            color: var(--text-primary);

            &.custom {
              font-size: 32px;
            }
          }

          .period {
            font-size: 14px;
            color: var(--text-secondary);
          }
        }

        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          flex-grow: 1;

          li {
            font-size: 14px;
            color: var(--text-secondary);
            padding: 6px 0;
            display: flex;
            align-items: center;
            gap: 8px;

            &::before {
              content: '';
              width: 16px;
              height: 16px;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff6900' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
              background-size: contain;
              background-repeat: no-repeat;
              flex-shrink: 0;
            }
          }
        }

        .plan-button {
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease-in-out;

          &.upgrade {
            background-color: #ff6900;
            color: white;
            border: none;

            &:hover {
              background-color: #e55f00;
            }
          }

          &.current-plan {
            background-color: var(--bg-secondary);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
            cursor: default;
          }

          &.contact {
            background-color: var(--text-primary);
            color: var(--bg-primary);
            border: none;

            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
    }
  }

  .payment-method {
    margin-top: 24px;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 25px;

    h3 {
      font-weight: 500;
      font-size: 18px;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .section-desc {
      font-weight: 400;
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .card-info {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1px solid var(--border-color);
      border-radius: 10px;

      .card-icon {
        width: 48px;
        height: 48px;
        background-color: var(--bg-secondary);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 24px;
          height: 24px;
          color: var(--text-secondary);
        }
      }

      .card-details {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .card-number {
          font-weight: 500;
          font-size: 14px;
          color: var(--text-primary);
        }

        .card-expiry {
          font-size: 13px;
          color: var(--text-secondary);
        }
      }

      .update-btn {
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        padding: 8px 20px;
        font-weight: 500;
        font-size: 14px;
        color: var(--text-primary);
        border-radius: 8px;
        cursor: pointer;
        transition: box-shadow 0.2s ease-in-out;

        &:hover {
          box-shadow: var(--shadow-sm);
        }
      }
    }
  }

  .invoice-history {
    margin-top: 24px;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 25px;

    h3 {
      font-weight: 500;
      font-size: 18px;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .section-desc {
      font-weight: 400;
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .invoices-table {
      width: 100%;
      border-collapse: collapse;

      th {
        text-align: left;
        font-weight: 500;
        font-size: 14px;
        color: var(--text-primary);
        padding: 12px 16px;
        border-bottom: 1px solid var(--border-color);
      }

      td {
        padding: 16px;
        font-size: 14px;
        color: var(--text-secondary);
        border-bottom: 1px solid var(--border-color);
      }

      tbody tr:last-child td {
        border-bottom: none;
      }

      .status-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        text-transform: lowercase;

        &.paid {
          background-color: #22c55e;
          color: white;
        }
      }

      .download-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        transition: background-color 0.2s ease-in-out;

        svg {
          width: 18px;
          height: 18px;
          color: var(--text-secondary);
        }

        &:hover {
          background-color: var(--bg-secondary);
        }
      }
    }
  }
}
</style>

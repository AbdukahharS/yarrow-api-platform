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
                :style="{ width: `${5 / 100 * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
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
}
</style>

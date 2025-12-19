<script setup lang="ts">
export interface RequestLog {
  timestamp: string
  endpoint: string
  method: string
  status: number
  responseTime: string
  bytes: string
}

interface Props {
  logs: RequestLog[]
}

defineProps<Props>()

const getStatusClass = (status: number) => {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'client-error'
  if (status >= 500) return 'server-error'
  return 'success'
}
</script>

<template>
  <div class="logs-section">
    <div class="logs-header">
      <h3>Request Logs</h3>
      <p class="subtitle">Detailed log of all API requests</p>
    </div>
    <div class="table-container">
      <table class="logs-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Status</th>
            <th>Response Time</th>
            <th>Bytes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log, index) in logs" :key="index">
            <td class="timestamp">{{ log.timestamp }}</td>
            <td class="endpoint">{{ log.endpoint }}</td>
            <td class="method">{{ log.method }}</td>
            <td>
              <span class="status-badge" :class="getStatusClass(log.status)">
                {{ log.status }}
              </span>
            </td>
            <td class="response-time">{{ log.responseTime }}</td>
            <td class="bytes">{{ log.bytes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.logs-section {
  background: var(--bg-primary);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  .logs-header {
    margin-bottom: 20px;

    h3 {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 13px;
      color: var(--text-tertiary);
    }
  }

  .table-container {
    overflow-x: auto;
    width: 100%;
    max-width: 100%;
  }

  .logs-table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        border-bottom: 1px solid var(--border-color);

        th {
          text-align: left;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          white-space: nowrap;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid var(--border-color);
        transition: background 0.15s ease;

        &:hover {
          background: var(--bg-secondary);
        }

        &:last-child {
          border-bottom: none;
        }

        td {
          padding: 14px 16px;
          font-size: 13px;
          color: var(--text-primary);

          &.timestamp {
            font-family: 'Courier New', monospace;
            color: var(--text-secondary);
            font-size: 12px;
          }

          &.endpoint {
            font-family: 'Courier New', monospace;
            font-size: 12px;
          }

          &.method {
            font-weight: 500;
            font-size: 12px;
          }

          &.response-time,
          &.bytes {
            color: var(--text-secondary);
          }

          .status-badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            color: white;

            &.success {
              background: #22c55e;
            }

            &.client-error {
              background: #f59e0b;
            }

            &.server-error {
              background: #ef4444;
            }
          }
        }
      }
    }
  }
}
</style>

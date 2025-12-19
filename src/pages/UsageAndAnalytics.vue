<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useFilteredLogs, useAggregatedData } from '../composables/useAnalyticsData'
import type { RequestLog } from '../composables/useAnalyticsData'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
} from 'chart.js'
import AnalyticsFilters from '../components/AnalyticsFilters.vue'
import TotalRequestsChart from '../components/charts/TotalRequestsChart.vue'
import ApiKeyChart from '../components/charts/ApiKeyChart.vue'
import EndpointChart from '../components/charts/EndpointChart.vue'
import StatusDistributionChart from '../components/charts/StatusDistributionChart.vue'
import RequestLogsTable from '../components/RequestLogsTable.vue'
import analyticsData from '../data/analyticsData.json'

const { theme } = useTheme()

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement
)

// Filter state
const selectedDateRange = ref<string>('7days')
const selectedApiKey = ref<string>('all')
const selectedEndpoint = ref<string>('all')
const selectedStatus = ref<string>('all')

// Load data from JSON file
const allRequestLogs: RequestLog[] = (analyticsData.requestLogs || []) as RequestLog[]

// Use composables for data filtering and aggregation
const filteredLogs = useFilteredLogs(allRequestLogs, {
  dateRange: selectedDateRange,
  apiKey: selectedApiKey,
  endpoint: selectedEndpoint,
  status: selectedStatus,
})

const aggregatedData = useAggregatedData(filteredLogs)
</script>

<template>
  <div class="usage-analytics">
    <div class="page-header">
      <div class="header-text">
        <h2>Usage & Analytics</h2>
        <p>Monitor your API usage and performance metrics</p>
      </div>
    </div>

    <!-- Filters -->
    <AnalyticsFilters
      v-model:date-range="selectedDateRange"
      v-model:api-key="selectedApiKey"
      v-model:endpoint="selectedEndpoint"
      v-model:status="selectedStatus"
    />

    <!-- Charts Grid -->
    <div class="charts-grid">
      <TotalRequestsChart :data="aggregatedData.byDate" :theme="theme" />
      <ApiKeyChart :data="aggregatedData.byApiKey" :theme="theme" />
      <EndpointChart :data="aggregatedData.byEndpoint" :theme="theme" />
      <StatusDistributionChart :data="aggregatedData.byStatus" :theme="theme" />
    </div>

    <!-- Request Logs Table -->
    <RequestLogsTable :logs="filteredLogs" />
  </div>
</template>

<style scoped>
.usage-analytics {
  padding: 24px 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.page-header {
  margin-bottom: 24px;

  .header-text {
    h2 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--text-primary);
    }

    p {
      font-size: 14px;
      line-height: 20px;
      color: var(--text-secondary);
    }
  }
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;
}
</style>

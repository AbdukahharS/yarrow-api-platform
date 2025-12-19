<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { getThemeColor } from '../../utils/chartHelpers'

interface Props {
  data: {
    success: number
    clientError: number
    serverError: number
  }
  theme: string
}

const props = defineProps<Props>()

const chartData = computed(() => {
  const total = props.data.success + props.data.clientError + props.data.serverError || 1
  const successPercent = Math.round((props.data.success / total) * 100)
  const serverErrorPercent = Math.round((props.data.serverError / total) * 100)
  const clientErrorPercent = Math.round((props.data.clientError / total) * 100)

  return {
    labels: ['2xx Success', '5xx Server Error', '4xx Client Error'],
    datasets: [
      {
        data: total > 1 ? [successPercent, serverErrorPercent, clientErrorPercent] : [89, 3, 8],
        backgroundColor: [
          '#22c55e', // success green
          '#ef4444', // error red
          '#f59e0b', // warning amber
        ],
        borderWidth: 0,
        spacing: 2,
      },
    ],
    _theme: props.theme,
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: getThemeColor('--bg-primary'),
      titleColor: getThemeColor('--text-primary'),
      bodyColor: getThemeColor('--text-secondary'),
      borderColor: getThemeColor('--border-color'),
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: function (context: any) {
          return context.parsed + '%'
        },
      },
    },
  },
  _theme: props.theme,
}))
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3>Response Status Distribution</h3>
      <p class="subtitle">Success vs error rates</p>
    </div>
    <div class="chart-container doughnut-container">
      <div class="pie-chart-wrapper">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
      <div class="doughnut-legend">
        <div class="legend-item">
          <div class="legend-color" style="background: #22c55e;"></div>
          <span class="legend-label">2xx Success</span>
          <span class="legend-value">{{ chartData.datasets[0]?.data[0] || 0 }}%</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #ef4444;"></div>
          <span class="legend-label">5xx Server Error</span>
          <span class="legend-value">{{ chartData.datasets[0]?.data[1] || 0 }}%</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #f59e0b;"></div>
          <span class="legend-label">4xx Client Error</span>
          <span class="legend-value">{{ chartData.datasets[0]?.data[2] || 0 }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-card {
  background: var(--bg-primary);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid var(--border-color);
  min-width: 0;

  .chart-header {
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

  .chart-container {
    width: 100%;
    height: 280px;
    position: relative;

    &.doughnut-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }
  }

  .pie-chart-wrapper {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
  }

  .doughnut-legend {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-shrink: 0;
    min-width: 180px;

    .legend-item {
      display: flex;
      align-items: center;
      gap: 10px;

      .legend-color {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        flex-shrink: 0;
      }

      .legend-label {
        font-size: 13px;
        color: var(--text-secondary);
        flex: 1;
        white-space: nowrap;
      }

      .legend-value {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary);
      }
    }
  }
}
</style>

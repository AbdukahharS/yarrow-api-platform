<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { getThemeColor, calculateChartScale, getTooltipOptions, getScaleOptions } from '../../utils/chartHelpers'

interface Props {
  data: Record<string, number>
  theme: string
}

const props = defineProps<Props>()

const processedData = computed(() => {
  const endpoints = Object.keys(props.data)
  const sortedEndpoints = endpoints
    .sort((a, b) => (props.data[b] || 0) - (props.data[a] || 0))
    .slice(0, 5)
  const values = sortedEndpoints.map(endpoint => props.data[endpoint] || 0)

  return {
    labels: sortedEndpoints.length > 0
      ? sortedEndpoints
      : ['/api/v1/users', '/api/v1/products', '/api/v1/orders', '/api/v1/analytics', '/api/v1/auth'],
    values: values.length > 0
      ? values
      : [30000, 22500, 18000, 15000, 12000],
  }
})

const chartData = computed(() => ({
  labels: processedData.value.labels,
  datasets: [
    {
      data: processedData.value.values,
      backgroundColor: getThemeColor('--primary-color'),
      borderRadius: 6,
      barThickness: 30,
    },
  ],
  _theme: props.theme,
}))

const chartOptions = computed(() => {
  const { yMax: xMax, stepSize } = calculateChartScale(processedData.value.values, 0.2)

  return {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        ...getTooltipOptions(),
        callbacks: {
          label: function (context: any) {
            return context.parsed.x.toLocaleString()
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: xMax,
        ticks: {
          stepSize: stepSize,
          ...getScaleOptions('x').ticks,
        },
        grid: {
          color: getThemeColor('--border-color'),
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      y: getScaleOptions('y'),
    },
    _theme: props.theme,
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3>Requests by Endpoint</h3>
      <p class="subtitle">Top endpoints by request count</p>
    </div>
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
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
  }
}
</style>

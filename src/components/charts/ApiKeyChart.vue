<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { getThemeColor, calculateChartScale, getTooltipOptions, getScaleOptions } from '../../utils/chartHelpers'

interface Props {
  data: Record<string, number>
  theme: string
}

const props = defineProps<Props>()

const chartValues = computed(() => [
  props.data['Production'] || 0,
  props.data['Development'] || 0,
  props.data['Mobile App'] || 0,
  props.data['Staging'] || 0,
])

const chartData = computed(() => ({
  labels: ['Production', 'Development', 'Mobile App', 'Staging'],
  datasets: [
    {
      data: chartValues.value,
      backgroundColor: getThemeColor('--primary-color'),
      borderRadius: 6,
      barThickness: 60,
    },
  ],
  _theme: props.theme,
}))

const chartOptions = computed(() => {
  const { yMax, stepSize } = calculateChartScale(chartValues.value, 0.2)

  return {
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
            return context.parsed.y.toLocaleString()
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yMax,
        ticks: {
          stepSize: stepSize,
          color: getThemeColor('--text-tertiary'),
          font: {
            size: 11,
          },
        },
        grid: {
          color: getThemeColor('--border-color'),
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: getScaleOptions('x'),
    },
    _theme: props.theme,
  }
})
</script>

<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3>Requests by API Key</h3>
      <p class="subtitle">Distribution across API keys</p>
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

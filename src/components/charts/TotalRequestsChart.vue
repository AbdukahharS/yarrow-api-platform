<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { getThemeColor, calculateChartScale, getTooltipOptions, getScaleOptions } from '../../utils/chartHelpers'

interface Props {
  data: Record<string, number>
  theme: string
}

const props = defineProps<Props>()

const processedData = computed(() => {
  const dates = Object.keys(props.data).sort((a, b) => {
    const dateA = new Date(a + ', 2024')
    const dateB = new Date(b + ', 2024')
    return dateA.getTime() - dateB.getTime()
  })
  const values = dates.map(date => props.data[date] || 0)

  return {
    labels: dates.length > 0 ? dates : ['Dec 5', 'Dec 6', 'Dec 7', 'Dec 8', 'Dec 9', 'Dec 10', 'Dec 12'],
    values: values.length > 0 ? values : [12000, 15000, 14000, 19000, 17000, 21000, 20000],
  }
})

const chartData = computed(() => ({
  labels: processedData.value.labels,
  datasets: [
    {
      data: processedData.value.values,
      borderColor: getThemeColor('--primary-color'),
      backgroundColor: getThemeColor('--primary-color'),
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: getThemeColor('--primary-color'),
      pointBorderColor: getThemeColor('--bg-primary'),
      pointBorderWidth: 2,
      pointHoverBackgroundColor: getThemeColor('--primary-color'),
      pointHoverBorderColor: getThemeColor('--bg-primary'),
      pointHoverBorderWidth: 2,
    },
  ],
  _theme: props.theme,
}))

const chartOptions = computed(() => {
  const { yMax, stepSize } = calculateChartScale(processedData.value.values, 0.2)

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
      <h3>Total Requests</h3>
      <p class="subtitle">Requests over time</p>
    </div>
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
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

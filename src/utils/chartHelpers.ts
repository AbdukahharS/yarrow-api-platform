/**
 * Get CSS variable value for theme-aware colors
 */
export const getThemeColor = (variable: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

/**
 * Calculate chart scale parameters with padding
 */
export const calculateChartScale = (values: number[], paddingPercent = 0.2) => {
  const maxValue = values.length > 0 ? Math.max(...values, 1) : 1
  const yMax = Math.ceil(maxValue * (1 + paddingPercent))
  const stepSize = Math.ceil(yMax / 4)
  return { yMax, stepSize }
}

/**
 * Common chart options for tooltips
 */
export const getTooltipOptions = () => ({
  backgroundColor: getThemeColor('--bg-primary'),
  titleColor: getThemeColor('--text-primary'),
  bodyColor: getThemeColor('--text-secondary'),
  borderColor: getThemeColor('--border-color'),
  borderWidth: 1,
  padding: 12,
  displayColors: false,
})

/**
 * Common chart options for scales
 */
export const getScaleOptions = (axisType: 'x' | 'y' = 'y') => ({
  ticks: {
    color: getThemeColor('--text-tertiary'),
    font: {
      size: 11,
    },
  },
  grid: {
    color: axisType === 'y' ? getThemeColor('--border-color') : undefined,
    display: axisType === 'y',
    drawBorder: false,
  },
  border: {
    display: false,
  },
})

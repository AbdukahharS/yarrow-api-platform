import { computed } from 'vue'
import type { Ref } from 'vue'

export interface RequestLog {
  timestamp: string
  endpoint: string
  method: string
  status: number
  responseTime: string
  bytes: string
  apiKey: string
  date: string
}

export interface AggregatedData {
  byDate: Record<string, number>
  byApiKey: Record<string, number>
  byEndpoint: Record<string, number>
  byStatus: {
    success: number
    clientError: number
    serverError: number
  }
}

interface Filters {
  dateRange: Ref<string>
  apiKey: Ref<string>
  endpoint: Ref<string>
  status: Ref<string>
}

/**
 * Parse date string from log entry
 */
const parseLogDate = (dateStr: string): Date => {
  const year = 2024
  const date = new Date(`${dateStr}, ${year}`)
  return date
}

/**
 * Filter logs based on selected filters
 */
export const useFilteredLogs = (allLogs: RequestLog[], filters: Filters) => {
  return computed(() => {
    return allLogs.filter(log => {
      // Filter by Date Range
      const logDate = parseLogDate(log.date)
      const today = new Date('2024-12-12') // Using Dec 12 as reference date
      const daysDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))

      if (filters.dateRange.value === '7days' && daysDiff > 7) {
        return false
      }
      if (filters.dateRange.value === '30days' && daysDiff > 30) {
        return false
      }
      if (filters.dateRange.value === '90days' && daysDiff > 90) {
        return false
      }

      // Filter by API Key
      if (filters.apiKey.value !== 'all' && log.apiKey !== filters.apiKey.value) {
        return false
      }

      // Filter by Endpoint
      if (filters.endpoint.value !== 'all' && log.endpoint !== filters.endpoint.value) {
        return false
      }

      // Filter by Status
      if (filters.status.value !== 'all') {
        if (filters.status.value === '2xx' && (log.status < 200 || log.status >= 300)) {
          return false
        }
        if (filters.status.value === '4xx' && (log.status < 400 || log.status >= 500)) {
          return false
        }
        if (filters.status.value === '5xx' && (log.status < 500 || log.status >= 600)) {
          return false
        }
      }

      return true
    })
  })
}

/**
 * Aggregate filtered logs into chart-ready data
 */
export const useAggregatedData = (filteredLogs: Ref<RequestLog[]>) => {
  return computed<AggregatedData>(() => {
    const logs = filteredLogs.value

    // Count by date
    const byDate: Record<string, number> = {}
    // Count by API key
    const byApiKey: Record<string, number> = {
      'Production': 0,
      'Development': 0,
      'Mobile App': 0,
      'Staging': 0,
    }
    // Count by endpoint
    const byEndpoint: Record<string, number> = {}
    // Count by status category
    const byStatus = {
      success: 0,
      clientError: 0,
      serverError: 0,
    }

    logs.forEach(log => {
      // By date
      byDate[log.date] = (byDate[log.date] || 0) + 1

      // By API key
      const keyName = log.apiKey === 'production' ? 'Production'
        : log.apiKey === 'development' ? 'Development'
        : log.apiKey === 'mobile' ? 'Mobile App'
        : 'Staging'
      byApiKey[keyName] = (byApiKey[keyName] || 0) + 1

      // By endpoint
      byEndpoint[log.endpoint] = (byEndpoint[log.endpoint] || 0) + 1

      // By status
      if (log.status >= 200 && log.status < 300) {
        byStatus.success++
      } else if (log.status >= 400 && log.status < 500) {
        byStatus.clientError++
      } else if (log.status >= 500) {
        byStatus.serverError++
      }
    })

    return { byDate, byApiKey, byEndpoint, byStatus }
  })
}

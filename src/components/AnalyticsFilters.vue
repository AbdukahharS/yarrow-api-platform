<script setup lang="ts">
import CustomSelect from './CustomSelect.vue'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  dateRange: string
  apiKey: string
  endpoint: string
  status: string
}

defineProps<Props>()
const emit = defineEmits(['update:dateRange', 'update:apiKey', 'update:endpoint', 'update:status'])

const handleDateRangeUpdate = (value: string | string[]) => {
  emit('update:dateRange', typeof value === 'string' ? value : value[0])
}

const handleApiKeyUpdate = (value: string | string[]) => {
  emit('update:apiKey', typeof value === 'string' ? value : value[0])
}

const handleEndpointUpdate = (value: string | string[]) => {
  emit('update:endpoint', typeof value === 'string' ? value : value[0])
}

const handleStatusUpdate = (value: string | string[]) => {
  emit('update:status', typeof value === 'string' ? value : value[0])
}

const dateRangeOptions: SelectOption[] = [
  { value: '7days', label: 'Last 7 days' },
  { value: '30days', label: 'Last 30 days' },
  { value: '90days', label: 'Last 90 days' },
]

const apiKeyOptions: SelectOption[] = [
  { value: 'all', label: 'All Keys' },
  { value: 'production', label: 'Production' },
  { value: 'development', label: 'Development' },
  { value: 'mobile', label: 'Mobile App' },
]

const endpointOptions: SelectOption[] = [
  { value: 'all', label: 'All Endpoints' },
  { value: '/api/v1/users', label: '/api/v1/users' },
  { value: '/api/v1/products', label: '/api/v1/products' },
  { value: '/api/v1/orders', label: '/api/v1/orders' },
]

const statusOptions: SelectOption[] = [
  { value: 'all', label: 'All Status' },
  { value: '2xx', label: '2xx Success' },
  { value: '4xx', label: '4xx Client Error' },
  { value: '5xx', label: '5xx Server Error' },
]
</script>

<template>
  <div class="filters">
    <div class="filter-group">
      <label>Date Range</label>
      <CustomSelect
        :model-value="dateRange"
        @update:model-value="handleDateRangeUpdate"
        :options="dateRangeOptions"
        placeholder="Select date range"
      />
    </div>
    <div class="filter-group">
      <label>API Key</label>
      <CustomSelect
        :model-value="apiKey"
        @update:model-value="handleApiKeyUpdate"
        :options="apiKeyOptions"
        placeholder="Select API key"
      />
    </div>
    <div class="filter-group">
      <label>Endpoint</label>
      <CustomSelect
        :model-value="endpoint"
        @update:model-value="handleEndpointUpdate"
        :options="endpointOptions"
        placeholder="Select endpoint"
      />
    </div>
    <div class="filter-group">
      <label>Status</label>
      <CustomSelect
        :model-value="status"
        @update:model-value="handleStatusUpdate"
        :options="statusOptions"
        placeholder="Select status"
      />
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 24px;

  .filter-group {
    min-width: 0;

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
  }
}
</style>

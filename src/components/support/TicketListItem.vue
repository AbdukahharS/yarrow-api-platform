<script setup lang="ts">
import type { Ticket } from '@/types/support'

defineProps<{
  ticket: Ticket
  isSelected: boolean
}>()

defineEmits<{
  select: [ticketId: string]
}>()

const getStatusClass = (status: string) => {
  return status.toLowerCase().replace('-', '')
}

const getPriorityClass = (priority: string) => {
  return priority.toLowerCase()
}
</script>

<template>
  <div
    class="ticket-item"
    :class="{ selected: isSelected }"
    @click="$emit('select', ticket.id)"
  >
    <div class="ticket-header">
      <span class="ticket-title">{{ ticket.title }}</span>
      <span class="status-badge" :class="getStatusClass(ticket.status)">
        {{ ticket.status }}
      </span>
    </div>
    <div class="ticket-meta">
      <span class="ticket-number">{{ ticket.ticketNumber }}</span>
      <span class="priority-badge" :class="getPriorityClass(ticket.priority)">
        {{ ticket.priority }}
      </span>
      <span class="message-count">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          ></path>
        </svg>
        {{ ticket.messageCount }}
      </span>
    </div>
    <span class="ticket-time">{{ ticket.updatedAt }}</span>
  </div>
</template>

<style scoped>
.ticket-item {
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;

  &:hover {
    background: var(--bg-tertiary);
  }

  &.selected {
    background: var(--bg-secondary);
    border-color: var(--border-color);
  }
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.ticket-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  flex: 1;
}

.ticket-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.ticket-number {
  font-size: 13px;
  color: var(--text-secondary);
}

.message-count {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);

  svg {
    opacity: 0.7;
  }
}

.ticket-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.status-badge {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;

  &.open {
    background-color: #2b7fff;
    color: #fff;
  }

  &.closed {
    background-color: var(--text-secondary);
    color: #fff;
  }

  &.inprogress {
    background-color: var(--primary-color);
    color: #fff;
  }
}

.priority-badge {
  font-size: 12px;
  font-weight: 500;
  text-transform: lowercase;

  &.low {
    color: var(--success-color);
  }

  &.medium {
    color: var(--primary-color);
  }

  &.high {
    color: var(--error-color);
  }
}
</style>

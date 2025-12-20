<script setup lang="ts">
import type { Ticket } from '@/types/support'
import MessageBubble from './MessageBubble.vue'
import MessageInput from './MessageInput.vue'

defineProps<{
  ticket: Ticket
}>()

defineEmits<{
  sendMessage: [message: string]
  attach: []
}>()

const getStatusClass = (status: string) => {
  return status.toLowerCase().replace('-', '')
}

const getPriorityClass = (priority: string) => {
  return priority.toLowerCase()
}
</script>

<template>
  <div class="detail-panel">
    <div class="detail-header">
      <div class="detail-title-row">
        <h3 class="detail-title">{{ ticket.title }}</h3>
        <div class="detail-badges">
          <span class="status-badge" :class="getStatusClass(ticket.status)">
            {{ ticket.status }}
          </span>
          <span
            class="priority-badge outline"
            :class="getPriorityClass(ticket.priority)"
          >
            {{ ticket.priority }}
          </span>
        </div>
      </div>
      <p class="detail-meta">
        Ticket {{ ticket.ticketNumber }} • Updated {{ ticket.updatedAt }}
      </p>
    </div>

    <div class="messages-container">
      <MessageBubble
        v-for="message in ticket.messages"
        :key="message.id"
        :message="message"
      />
    </div>

    <MessageInput
      @send="$emit('sendMessage', $event)"
      @attach="$emit('attach')"
    />
  </div>
</template>

<style scoped>
.detail-panel {
  flex: 1;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

.detail-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.detail-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.detail-badges {
  display: flex;
  gap: 8px;
}

.detail-meta {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.messages-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

  &.outline {
    padding: 2px 8px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid currentColor;
  }
}
</style>

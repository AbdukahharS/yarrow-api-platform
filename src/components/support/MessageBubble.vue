<script setup lang="ts">
import type { Message } from '@/types/support'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div class="message" :class="message.sender">
    <div class="message-header">
      <span class="message-sender-avatar" :class="message.sender">
        {{ message.sender === 'user' ? 'Y' : 'S' }}
      </span>
      <div class="message-info">
        <span class="message-sender">{{
          message.sender === 'user' ? 'You' : 'Support Team'
        }}</span>
        <span class="message-time">{{ message.timestamp }}</span>
      </div>
    </div>
    <div class="message-content">
      <p>{{ message.content }}</p>
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
}

.message-header {
  display: flex;
  gap: 12px;
}

.message-sender-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;

  &.user {
    background-color: var(--primary-color);
    color: #fff;
  }

  &.support {
    background-color: var(--text-secondary);
    color: #fff;
  }
}

.message-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
}

.message-sender {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.message-time {
  font-size: 12px;
  color: var(--text-tertiary);
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;

  p {
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
  }
}

.message.user .message-content {
  margin-left: 44px;
  background-color: color-mix(in srgb, var(--text-secondary) 10%, transparent);
  color: var(--text-primary);
}

.message.support .message-header {
  flex-direction: row-reverse;
  justify-content: space-between;
}

.message.support .message-content {
  margin-right: 44px;
  background-color: color-mix(in srgb, var(--primary-color) 10%, transparent);
  color: var(--text-primary);
}
</style>

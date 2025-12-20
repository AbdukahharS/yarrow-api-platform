<script setup lang="ts">
import type { Message } from '@/types/support'

defineProps<{
  message: Message
}>()

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const isImage = (type: string): boolean => {
  return type.startsWith('image/')
}
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
      <p v-if="message.content">{{ message.content }}</p>
      <div v-if="message.attachments?.length" class="attachments">
        <template v-for="attachment in message.attachments" :key="attachment.id">
          <a
            v-if="isImage(attachment.type)"
            :href="attachment.url"
            target="_blank"
            class="attachment-image"
          >
            <img :src="attachment.url" :alt="attachment.name" />
          </a>
          <a
            v-else
            :href="attachment.url"
            :download="attachment.name"
            class="attachment-file"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <span class="attachment-name">{{ attachment.name }}</span>
            <span class="attachment-size">{{ formatFileSize(attachment.size) }}</span>
          </a>
        </template>
      </div>
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

.attachments {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;

  &:first-child {
    margin-top: 0;
  }
}

.attachment-image {
  display: block;
  max-width: 300px;
  border-radius: 8px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.attachment-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-secondary);
  }

  svg {
    flex-shrink: 0;
    color: var(--text-secondary);
  }
}

.attachment-name {
  flex: 1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attachment-size {
  font-size: 12px;
  color: var(--text-tertiary);
  flex-shrink: 0;
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

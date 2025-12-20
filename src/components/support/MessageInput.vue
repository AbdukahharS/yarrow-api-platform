<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  send: [message: string]
  attach: []
}>()

const message = ref('')

const handleSend = () => {
  if (!message.value.trim()) return
  emit('send', message.value.trim())
  message.value = ''
}
</script>

<template>
  <div class="message-input-container">
    <input
      v-model="message"
      type="text"
      placeholder="Type your message..."
      class="message-input"
      @keyup.enter="handleSend"
    />
    <button class="attach-btn" title="Attach file" @click="$emit('attach')">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        ></path>
      </svg>
    </button>
    <button
      class="send-btn"
      @click="handleSend"
      :disabled="!message.trim()"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.message-input-container {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-top: 1px solid var(--border-color);
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:focus {
    border-color: var(--primary-color);
    background: var(--bg-primary);
  }
}

.attach-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--primary-color);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>

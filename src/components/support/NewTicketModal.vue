<script setup lang="ts">
import { ref, watch } from 'vue'
import type { TicketPriority, NewTicketData } from '@/types/support'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  create: [data: NewTicketData]
}>()

const title = ref('')
const message = ref('')
const priority = ref<TicketPriority>('medium')

const resetForm = () => {
  title.value = ''
  message.value = ''
  priority.value = 'medium'
}

watch(
  () => props.isOpen,
  (newValue) => {
    if (!newValue) {
      resetForm()
    }
  }
)

const handleSubmit = () => {
  if (!title.value.trim() || !message.value.trim()) return
  emit('create', {
    title: title.value.trim(),
    message: message.value.trim(),
    priority: priority.value,
  })
}

const isValid = () => title.value.trim() && message.value.trim()
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <div>
            <h3 class="modal-title">Create New Ticket</h3>
            <p class="modal-subtitle">
              Describe your issue and we'll get back to you soon
            </p>
          </div>
          <button class="close-btn" @click="$emit('close')">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="ticket-title">Subject</label>
            <input
              id="ticket-title"
              v-model="title"
              type="text"
              placeholder="Brief description of your issue"
              class="form-input"
            />
          </div>
          <div class="form-group">
            <label for="ticket-priority">Priority</label>
            <select id="ticket-priority" v-model="priority" class="form-input">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div class="form-group">
            <label for="ticket-message">Message</label>
            <textarea
              id="ticket-message"
              v-model="message"
              placeholder="Describe your issue in detail..."
              class="form-input textarea"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="cancel-btn" @click="$emit('close')">Cancel</button>
          <button
            class="submit-btn"
            @click="handleSubmit"
            :disabled="!isValid()"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: var(--bg-primary);
  border-radius: 16px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 24px 24px 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.modal-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--text-primary);
  }
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
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

  &.textarea {
    resize: vertical;
    min-height: 100px;
  }
}

select.form-input {
  cursor: pointer;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--bg-secondary);
  }
}

.submit-btn {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.2s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>

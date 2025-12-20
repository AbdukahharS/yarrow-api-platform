<script setup lang="ts">
import { ref, watch } from 'vue'
import CustomSelect from '../CustomSelect.vue'
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
const attachments = ref<File[]>([])
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

const resetForm = () => {
  title.value = ''
  message.value = ''
  priority.value = 'medium'
  attachments.value = []
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

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files) {
    addFiles(e.dataTransfer.files)
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    addFiles(target.files)
  }
}

const addFiles = (files: FileList) => {
  attachments.value = [...attachments.value, ...Array.from(files)]
}

const removeAttachment = (index: number) => {
  attachments.value = attachments.value.filter((_, i) => i !== index)
}

const openFileDialog = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
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
        <div class="modal-header">
          <h3 class="modal-title">Create Support Ticket</h3>
          <p class="modal-subtitle">
            Describe your issue and we'll get back to you soon
          </p>
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
            <div class="select-wrapper">
              <CustomSelect
                v-model="priority"
                :options="[
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]"
                placeholder="Select priority"
                :multiple="false"
              />
              <!-- <select id="ticket-priority" v-model="priority" class="form-input">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select> -->
              <svg
                class="select-chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          <div class="form-group">
            <label for="ticket-message">Description</label>
            <textarea
              id="ticket-message"
              v-model="message"
              placeholder="Provide detailed information about your issue"
              class="form-input textarea"
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label>Attachments</label>
            <div
              class="upload-area"
              :class="{ dragging: isDragging }"
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
              @click="openFileDialog"
            >
              <input
                ref="fileInputRef"
                type="file"
                multiple
                class="file-input"
                @change="handleFileSelect"
              />
              <svg
                class="upload-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
                ></path>
              </svg>
              <span class="upload-text">Click to upload or drag and drop</span>
            </div>
            <div v-if="attachments.length > 0" class="attachments-list">
              <div
                v-for="(file, index) in attachments"
                :key="index"
                class="attachment-item"
              >
                <span class="attachment-name">{{ file.name }}</span>
                <button
                  class="remove-attachment"
                  @click.stop="removeAttachment(index)"
                >
                  <svg
                    width="14"
                    height="14"
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
            </div>
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
  border-radius: 12px;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  max-height: 90vh;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-tertiary);
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

.modal-header {
  padding: 24px 24px 0 24px;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.modal-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.modal-body {
  padding: 20px 24px;
}

.form-group {
  margin-bottom: 16px;

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
  padding: 12px 14px;
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
  }

  &.textarea {
    resize: vertical;
    min-height: 80px;
  }
}

.select-wrapper {
  position: relative;
}

.select-wrapper select.form-input {
  cursor: pointer;
  appearance: none;
  padding-right: 36px;
}

.select-chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
}

.upload-area {
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &.dragging {
    border-color: var(--primary-color);
    background: var(--bg-secondary);
  }
}

.file-input {
  display: none;
}

.upload-icon {
  color: var(--text-tertiary);
}

.upload-text {
  font-size: 14px;
  color: var(--text-secondary);
}

.attachments-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attachment-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.attachment-name {
  font-size: 13px;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-attachment {
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    color: var(--color-error);
  }
}

.modal-footer {
  padding: 16px 24px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 10px 24px;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-primary);
  border-radius: 24px;
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
  padding: 10px 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    opacity: 0.9;
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

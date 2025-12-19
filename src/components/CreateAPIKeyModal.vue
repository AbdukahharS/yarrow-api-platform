<script setup lang="ts">
import { ref } from 'vue'
import CustomSelect from './CustomSelect.vue'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'create', data: {
    name: string
    scopes: string[]
    ipRestrictions: string
    allowedOrigins: string
    expiration: string
  }): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const keyName = ref('')
const scopes = ref<string[]>([])
const ipRestrictions = ref('')
const allowedOrigins = ref('')
const expiration = ref('')

const scopesOptions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
  { value: 'admin', label: 'Admin' }
]

const expirationOptions = [
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
  { value: '180', label: '180 days' },
  { value: 'never', label: 'Never' }
]

const handleClose = () => {
  emit('close')
}

const handleCreate = () => {
  emit('create', {
    name: keyName.value,
    scopes: scopes.value,
    ipRestrictions: ipRestrictions.value,
    allowedOrigins: allowedOrigins.value,
    expiration: expiration.value
  })

  // Reset form
  keyName.value = ''
  scopes.value = []
  ipRestrictions.value = ''
  allowedOrigins.value = ''
  expiration.value = ''
}

const handleCancel = () => {
  // Reset form
  keyName.value = ''
  scopes.value = []
  ipRestrictions.value = ''
  allowedOrigins.value = ''
  expiration.value = ''
  handleClose()
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
      <div class="modal-container">
        <div class="modal-header">
          <div>
            <h2 class="modal-title">Create New API Key</h2>
            <p class="modal-subtitle">Configure your API key settings</p>
          </div>
          <button class="close-btn" @click="handleClose">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label for="keyName">Key Name</label>
            <input
              id="keyName"
              v-model="keyName"
              type="text"
              placeholder="Production API"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="scopes">Scopes</label>
            <CustomSelect
              v-model="scopes"
              :options="scopesOptions"
              placeholder="Select scopes"
              :multiple="true"
            />
          </div>

          <div class="form-group">
            <label for="ipRestrictions">IP Restrictions (optional)</label>
            <input
              id="ipRestrictions"
              v-model="ipRestrictions"
              type="text"
              placeholder="192.168.1.1, 10.0.0.1"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="allowedOrigins">Allowed Origins (optional)</label>
            <input
              id="allowedOrigins"
              v-model="allowedOrigins"
              type="text"
              placeholder="https://example.com"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="expiration">Expiration</label>
            <CustomSelect
              v-model="expiration"
              :options="expirationOptions"
              placeholder="Select expiration"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="handleCancel">Cancel</button>
          <button class="btn-create" @click="handleCreate">Create Key</button>
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
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: var(--bg-primary);
  border-radius: 16px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow: hidden;
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
  font-size: 20px;
  font-weight: 600;
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
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.form-group {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

label {
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
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
}

.btn-cancel,
.btn-create {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  flex: 1
}

.btn-cancel {
  background: var(--bg-secondary);
  color: var(--text-primary);

  &:hover {
    background: var(--bg-tertiary);
  }
}

.btn-create {
  background: var(--primary-color);
  color: white;

  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
}

/* Modal transition */
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

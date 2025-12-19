<script setup lang="ts">
import { ref, watch } from 'vue'
import CreateAPIKeyModal from '../components/CreateAPIKeyModal.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

import Trash from '../assets/icons/trash.svg?component'
import Eye from '../assets/icons/eye.svg?component'
import EyeClosed from '../assets/icons/eye-closed.svg?component'
import Check from '../assets/icons/check.svg?component'
import Copy from '../assets/icons/copy.svg?component'

interface APIKey {
  id: string
  name: string
  key: string
  status: 'active' | 'inactive'
  created: string
  restrictions: string
}

const STORAGE_KEY = 'yarrow-api-keys'

const defaultAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production',
    key: 'yrw_prod_51234567890abcdefghijklmnop',
    status: 'active',
    created: 'Jan 15, 2024',
    restrictions: 'IP: 192.168.1.1'
  },
  {
    id: '2',
    name: 'Development',
    key: 'yrw_dev_51234567890abcdefghijklmnop',
    status: 'active',
    created: 'Jan 10, 2024',
    restrictions: 'None'
  },
  {
    id: '3',
    name: 'Mobile App',
    key: 'yrw_prod_98765432100zyxwvutsrqponmlk',
    status: 'active',
    created: 'Dec 20, 2023',
    restrictions: 'Origin: app.example.com'
  }
]

// Load API keys from localStorage or use defaults
const loadAPIKeys = (): APIKey[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse stored API keys:', e)
      return defaultAPIKeys
    }
  }
  return defaultAPIKeys
}

// Save API keys to localStorage
const saveAPIKeys = (keys: APIKey[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keys))
}

const apiKeys = ref<APIKey[]>(loadAPIKeys())

// Watch for changes and persist to localStorage
watch(apiKeys, (newKeys) => {
  saveAPIKeys(newKeys)
}, { deep: true })

const visibleKeys = ref<Set<string>>(new Set())
const copiedKeys = ref<Set<string>>(new Set())
const isModalOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const keyToDelete = ref<string | null>(null)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const openDeleteDialog = (id: string) => {
  keyToDelete.value = id
  isDeleteDialogOpen.value = true
}

const closeDeleteDialog = () => {
  keyToDelete.value = null
  isDeleteDialogOpen.value = false
}

const handleCreateKey = (data: {
  name: string
  scopes: string[]
  ipRestrictions: string
  allowedOrigins: string
  expiration: string
}) => {
  // Generate a random API key
  const newKey: APIKey = {
    id: Date.now().toString(),
    name: data.name,
    key: `yrw_prod_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    status: 'active',
    created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    restrictions: data.ipRestrictions ? `IP: ${data.ipRestrictions}` : data.allowedOrigins ? `Origin: ${data.allowedOrigins}` : 'None'
  }

  apiKeys.value.unshift(newKey)
  closeModal()
}

const toggleKeyVisibility = (id: string) => {
  if (visibleKeys.value.has(id)) {
    visibleKeys.value.delete(id)
  } else {
    visibleKeys.value.add(id)
  }
}

const copyKey = (key: string, id: string) => {
  navigator.clipboard.writeText(key)
  copiedKeys.value.add(id)
  setTimeout(() => {
    copiedKeys.value.delete(id)
  }, 2000)
}

const confirmDelete = () => {
  if (keyToDelete.value) {
    apiKeys.value = apiKeys.value.filter(k => k.id !== keyToDelete.value)
    closeDeleteDialog()
  }
}

const getDisplayKey = (key: string, id: string) => {
  if (visibleKeys.value.has(id)) {
    return key
  }
  return '••••••••••••••••'
}
</script>

<template>
  <div class="api-keys">
    <div class="top">
      <div class="left">
        <h2>API Keys</h2>
        <p>Manage your API keys and access tokens</p>
      </div>
      <button @click="openModal"><span>+</span> Create API Key</button>
    </div>
    <div class="container">
      <h3 class="title">Your API Keys</h3>
      <p class="desc">Use these keys to authenticate your API requests</p>
      <div class="keys">
        <div v-for="apiKey in apiKeys" :key="apiKey.id" class="key-card">
        <div class="key-header">
          <div class="key-name-status">
            <span class="key-name">{{ apiKey.name }}</span>
            <span class="status-badge">{{ apiKey.status }}</span>
          </div>
          <button class="delete-btn" @click="openDeleteDialog(apiKey.id)">
            <Trash width="16" height="16" />
          </button>
        </div>

        <div class="key-value">
          <span class="key-text">{{ getDisplayKey(apiKey.key, apiKey.id) }}</span>
          <div class="key-actions">
            <button class="icon-btn" @click="toggleKeyVisibility(apiKey.id)">
              <Eye v-if="!visibleKeys.has(apiKey.id)" width="16" height="16" />
              <EyeClosed v-else width="16" height="16" />
            </button>
            <button class="icon-btn" @click="copyKey(apiKey.key, apiKey.id)">
              <Check v-if="copiedKeys.has(apiKey.id)" width="16" height="16" />
              <Copy v-else width="16" height="16" />
            </button>
          </div>
        </div>

        <div class="key-meta">
          <span>Created: {{ apiKey.created }}</span>
          <span>Restrictions: {{ apiKey.restrictions }}</span>
        </div>
      </div>
    </div>
    </div>

    <CreateAPIKeyModal
      :is-open="isModalOpen"
      @close="closeModal"
      @create="handleCreateKey"
    />

    <ConfirmDialog
      :is-open="isDeleteDialogOpen"
      title="Delete API Key"
      message="Are you sure you want to delete this API key? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      confirm-variant="danger"
      @close="closeDeleteDialog"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.api-keys {
  padding: 24px 0;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .left {
      h2 {
        font-size: 24px;
        line-height: 32px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
        line-height: 20px;
        color: var(--text-secondary);
      }
    }

    button {
      background-color: var(--primary-color);
      color: #fff;
      border: none;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      transition: all 0.2s ease-in-out;

      &:hover {
        box-shadow: var(--shadow-md);
      }

      span {
        font-size: 20px;
        line-height: 0;
      }
    }
  }

  .container {
    margin-top: 25px;
    background: var(--bg-primary);
    padding: 24px;
    border-radius: 14px;
    border: 1px solid var(--border-color);

    .title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .desc {
      font-size: 14px;
      color: var(--text-secondary);
      margin-bottom: 20px;
    }

    .keys {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .key-card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 18px 18px 30px 18px;
    transition: all 0.2s ease-in-out;

    .key-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .key-name-status {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .key-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .status-badge {
      background-color: var(--success-color);
      color: #fff;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 500;
      text-transform: lowercase;
    }

    .delete-btn {
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }

    .key-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-secondary);
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .key-text {
      font-family: 'Courier New', monospace;
      font-size: 14px;
      color: var(--text-primary);
      letter-spacing: 0.5px;
    }

    .key-actions {
      display: flex;
      gap: 8px;
    }

    .icon-btn {
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

    .key-meta {
      display: flex;
      gap: 24px;
      font-size: 13px;
      color: var(--text-secondary);

      span {
        display: inline-block;
      }
    }
  }
}
</style>

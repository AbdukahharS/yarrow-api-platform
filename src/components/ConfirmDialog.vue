<script setup lang="ts">
interface Props {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'danger' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmVariant: 'danger'
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="handleCancel">
      <div class="confirm-dialog" @click.stop>
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="dialog-actions">
          <button class="cancel-btn" @click="handleCancel">{{ cancelText }}</button>
          <button
            class="confirm-btn"
            :class="confirmVariant"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
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

.confirm-dialog {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-lg);

  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--text-primary);
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 20px;
    margin-bottom: 24px;
  }

  .dialog-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;

    button {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      border: none;
    }

    .cancel-btn {
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);

      &:hover {
        background: var(--bg-tertiary);
      }
    }

    .confirm-btn {
      color: #fff;

      &.danger {
        background: #ef4444;

        &:hover {
          background: #dc2626;
        }
      }

      &.primary {
        background: var(--primary-color);

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
</style>

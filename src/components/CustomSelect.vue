<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string | string[]
  options: Option[]
  placeholder?: string
  multiple?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | string[]): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select option',
  multiple: false
})

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  if (props.multiple) {
    const selected = props.modelValue as string[]
    if (selected.length === 0) return props.placeholder
    if (selected.length === 1) {
      const option = props.options.find(opt => opt.value === selected[0])
      return option?.label || props.placeholder
    }
    return `${selected.length} selected`
  } else {
    const option = props.options.find(opt => opt.value === props.modelValue)
    return option?.label || props.placeholder
  }
})

const hasValue = computed(() => {
  if (props.multiple) {
    return (props.modelValue as string[]).length > 0
  }
  return !!props.modelValue
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value: string) => {
  if (props.multiple) {
    const currentValues = props.modelValue as string[]
    if (currentValues.includes(value)) {
      emit('update:modelValue', currentValues.filter(v => v !== value))
    } else {
      emit('update:modelValue', [...currentValues, value])
    }
  } else {
    emit('update:modelValue', value)
    isOpen.value = false
  }
}

const isSelected = (value: string) => {
  if (props.multiple) {
    return (props.modelValue as string[]).includes(value)
  }
  return props.modelValue === value
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="selectRef" class="custom-select" :class="{ 'is-open': isOpen }">
    <button
      type="button"
      class="select-trigger"
      :class="{ 'has-value': hasValue }"
      @click="toggleDropdown"
    >
      <span class="select-value">{{ selectedLabel }}</span>
      <svg
        class="select-arrow"
        :class="{ 'is-open': isOpen }"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div class="select-options">
          <button
            v-for="option in options"
            :key="option.value"
            type="button"
            class="select-option"
            :class="{ 'is-selected': isSelected(option.value) }"
            @click="selectOption(option.value)"
          >
            <span>{{ option.label }}</span>
            <svg
              v-if="isSelected(option.value)"
              class="check-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 4L6 11.3333L2.66667 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-tertiary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  &:hover {
    border-color: var(--primary-color);
  }

  &:focus,
  &.is-open {
    border-color: var(--primary-color);
    background: var(--bg-primary);
  }

  &.has-value {
    color: var(--text-primary);
  }
}

.select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select-arrow {
  flex-shrink: 0;
  margin-left: 8px;
  color: var(--text-secondary);
  transition: transform 0.2s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  overflow: hidden;
}

.select-options {
  max-height: 240px;
  overflow-y: auto;
  padding: 4px;
}

.select-option {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  color: var(--text-primary);
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  &:hover {
    background: var(--bg-secondary);
  }

  &.is-selected {
    color: var(--primary-color);
    font-weight: 500;
  }
}

.check-icon {
  flex-shrink: 0;
  color: var(--primary-color);
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Custom scrollbar - uses global theme-aware scrollbar */
.select-options::-webkit-scrollbar {
  width: 8px;
}

.select-options::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 4px;
}

.select-options::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 4px;
}

.select-options::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover);
}
</style>

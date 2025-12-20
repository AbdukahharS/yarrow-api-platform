<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Logo from '../../assets/logo.svg'

const router = useRouter()
const toast = useToast()

const step = ref(1)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const companyName = ref('')
const errors = ref({ email: '', password: '', confirmPassword: '', companyName: '' })
const isLoading = ref(false)

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleStep1 = () => {
  errors.value.email = ''

  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    return
  }

  if (!validateEmail(email.value)) {
    errors.value.email = 'Please enter a valid email address'
    return
  }

  // Check if email already exists
  const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]')
  if (dummyUsers.some((u: any) => u.email === email.value)) {
    errors.value.email = 'This email is already registered'
    return
  }

  step.value = 2
}

const handleStep2 = () => {
  errors.value.password = ''
  errors.value.confirmPassword = ''

  if (!password.value) {
    errors.value.password = 'Password is required'
    return
  }

  if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    return
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
    return
  }

  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    return
  }

  step.value = 3
}

const handleCreateAccount = () => {
  errors.value.companyName = ''

  if (!companyName.value.trim()) {
    errors.value.companyName = 'Company name is required'
    return
  }

  // Simulate API call
  isLoading.value = true

  setTimeout(() => {
    // Save to localStorage
    const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]')
    dummyUsers.push({
      email: email.value,
      password: password.value,
      company: companyName.value,
      plan: 'Starter',
      emailBalance: 1000
    })
    localStorage.setItem('dummyUsers', JSON.stringify(dummyUsers))

    isLoading.value = false

    // Show success and redirect to sign in
    toast.success('Account created successfully! Please sign in.')
    router.push('/signin')
  }, 1000)
}
</script>

<template>
  <div class="container">
    <div class="header">
      <img :src="Logo" alt="Yarrow Logo" />
    </div>

    <div class="form">
      <h2>Create Account</h2>
      <div class="steps">
        <p class="text">Step {{ step }} of 3</p>
        <div class="slider">
          <div class="progress" :style="{ width: `${(step / 3) * 100}%` }" />
        </div>
      </div>

      <template v-if="step === 1">
        <label for="email">Email</label><br />
        <input
          type="text"
          id="email"
          v-model="email"
          :class="{ error: errors.email }"
          placeholder="you@example.com"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>

        <button @click="handleStep1" style="margin-bottom: 76px">
          Continue
        </button>
      </template>

      <template v-if="step === 2">
        <label for="password">Password</label><br />
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{ error: errors.password }"
          placeholder="At least 6 characters"
        />
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>

        <label for="confirmPassword" style="margin-top: 16px; display: block"
          >Confirm Password</label
        >
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          :class="{ error: errors.confirmPassword }"
          placeholder="Re-enter your password"
        />
        <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>

        <div class="buttons">
          <button @click="() => (step = 1)" class="back">Back</button>
          <button @click="handleStep2">Next</button>
        </div>
      </template>

      <template v-if="step === 3">
        <label for="companyName">Company Name</label><br />
        <input
          type="text"
          id="companyName"
          v-model="companyName"
          :class="{ error: errors.companyName }"
          :disabled="isLoading"
        />
        <span v-if="errors.companyName" class="error-message">{{ errors.companyName }}</span>

        <div class="buttons">
          <button @click="() => (step = 2)" class="back" :disabled="isLoading">Back</button>
          <button @click="handleCreateAccount" :disabled="isLoading">
            {{ isLoading ? 'Creating...' : 'Create Account' }}
          </button>
        </div>
      </template>

      <p class="redirect">
        Already have an account? <router-link to="/signin">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 450px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 100px;
  padding: 10% 30px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin: 0 auto;
      display: block;
    }
  }

  .form {
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 24px;

    .buttons {
      display: flex;
      flex-direction: row;
      gap: 8px;

      .back {
        background: var(--bg-primary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
      }
    }

    .steps {
      margin-top: 6px;
      margin-bottom: 24px;

      .text {
        font-weight: 400;
        font-size: 16px;
        color: var(--text-secondary);
        text-align: center;
        margin-bottom: 15px;
      }

      .slider {
        height: 8px;
        width: 100%;
        background: var(--input-border);
        border-radius: 4px;

        .progress {
          background: var(--primary-color);
          height: 8px;
          border-radius: 4px;
          transition: width 0.3s ease-in-out;
        }
      }
    }

    h2 {
      text-align: center;
      color: var(--primary-color);
      font-weight: 700;
      font-size: 16px;
    }

    h1 {
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-top: 28px;
    }

    label {
      font-weight: 500;
      color: var(--text-primary);
      font-size: 14px;
      margin-top: 4px;
      margin-bottom: 8px;
      line-height: 14px;
    }

    input {
      border: 2px solid var(--input-border);
      background: var(--input-bg);
      border-radius: 8px;
      width: 100%;
      padding: 9.5px 12px;
      font-size: 14px;
      font-weight: 400;
      color: var(--text-secondary);
      outline: none;
      transition: all 0.2s ease-in-out;

      &:focus {
        border-color: var(--input-focus);
      }

      &.error {
        border-color: var(--error-color);
        background: var(--error-bg);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .error-message {
      display: block;
      color: var(--error-color);
      font-size: 12px;
      margin-top: 4px;
      font-weight: 400;
    }

    .stack {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;

      a {
        color: #ff6900;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
        font-weight: 400;
        font-size: 12px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    button {
      background: var(--primary-color);
      width: 100%;
      padding: 8px;
      border-radius: 8px;
      border: none;
      color: #fff;
      margin-top: 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover:not(:disabled) {
        box-shadow: var(--shadow-md);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .redirect {
      text-align: center;
      margin-top: 16px;
      color: var(--text-tertiary);
      font-size: 14px;
      font-weight: 400;

      a {
        color: var(--primary-color);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

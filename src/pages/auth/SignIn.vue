<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import Logo from '../../assets/logo.svg'
import { useAuth } from '../../composables/useAuth'

const router = useRouter()
const toast = useToast()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errors = ref({ email: '', password: '', general: '' })
const isLoading = ref(false)

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  errors.value = { email: '', password: '', general: '' }

  // Validation
  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    return
  }

  if (!validateEmail(email.value)) {
    errors.value.email = 'Please enter a valid email address'
    return
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
    return
  }

  if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    return
  }

  // Simulate API call
  isLoading.value = true

  setTimeout(() => {
    // Check against dummy credentials
    const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]')
    const user = dummyUsers.find(
      (u: any) => u.email === email.value && u.password === password.value
    )

    if (user) {
      login()
      localStorage.setItem('authUser', JSON.stringify({ email: user.email, company: user.company }))
      toast.success('Welcome back!')
      router.push('/')
    } else {
      errors.value.general = 'Invalid email or password'
    }

    isLoading.value = false
  }, 1000)
}
</script>

<template>
  <div class="container">
    <img :src="Logo" alt="Yarrow Logo" />

    <div class="form">
      <h2>API Platform</h2>
      <h1>Sign in to your account</h1>

      <form @submit.prevent="handleSubmit">
        <label for="email">Email</label><br />
        <input
          type="text"
          id="email"
          v-model="email"
          :class="{ error: errors.email }"
          :disabled="isLoading"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>

        <div class="stack">
          <label for="password">Password</label>
          <router-link to="/forgot-password">Forgot password?</router-link>
        </div>
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{ error: errors.password }"
          :disabled="isLoading"
        />
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        <span v-if="errors.general" class="error-message general">{{ errors.general }}</span>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Log In' }}
        </button>
      </form>

      <p class="redirect">
        Don't have an account? <router-link to="/register">Sign up</router-link>
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

  img {
    margin: 0 auto;
    display: block;
  }

  .form {
    border: 1px solid #0000001a;
    border-radius: 14px;
    padding: 24px;

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
      color: #717182;
      margin-top: 28px;
    }

    label {
      font-weight: 500;
      color: #0a0a0a;
      font-size: 14px;
      margin-top: 4px;
      margin-bottom: 8px;
      line-height: 14px;
    }

    input {
      border: 2px solid #f3f3f5;
      background: #f3f3f5;
      border-radius: 8px;
      width: 100%;
      padding: 9.5px 12px;
      font-size: 14px;
      font-weight: 400;
      color: #717182;
      outline: none;
      transition: all 0.2s ease-in-out;

      &:focus {
        border-color: #717182;
      }

      &.error {
        border-color: #ef4444;
        background: #fef2f2;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .error-message {
      display: block;
      color: #ef4444;
      font-size: 12px;
      margin-top: 4px;
      font-weight: 400;

      &.general {
        text-align: center;
        margin-top: 12px;
        font-size: 13px;
      }
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
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .redirect {
        text-align: center;
        margin-top: 16px;
        color: #4A5565;
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

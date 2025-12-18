<script setup lang="ts">
import Logo from '../../assets/logo.svg'
import ArrowLeft from '../../assets/arrow-left.svg?component'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isSent = ref(false)
const email = ref('')
const error = ref('')
const isLoading = ref(false)

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSend = () => {
  error.value = ''

  if (!email.value.trim()) {
    error.value = 'Email is required'
    return
  }

  if (!validateEmail(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }

  // Simulate API call
  isLoading.value = true

  setTimeout(() => {
    // Check if email exists
    const dummyUsers = JSON.parse(localStorage.getItem('dummyUsers') || '[]')
    const userExists = dummyUsers.some((u: any) => u.email === email.value)

    if (!userExists) {
      error.value = 'No account found with this email address'
      isLoading.value = false
      return
    }

    isSent.value = true
    isLoading.value = false
  }, 1000)
}

const handleResend = () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    toast.success('Password reset link sent again!')
  }, 1000)
}
</script>

<template>
  <div class="container">
    <img :src="Logo" alt="Yarrow Logo" />

    <div :class="`form ${isSent && 'sent'}`">
      <template v-if="!isSent">
        <h2>Reset Password</h2>
        <p>
          Enter your email address and we'll send you a link to reset your
          password
        </p>

        <label for="email">Email</label><br />
        <input
          type="text"
          id="email"
          placeholder="you@example.com"
          v-model="email"
          :class="{ error: error }"
          :disabled="isLoading"
        />
        <span v-if="error" class="error-message">{{ error }}</span>

        <button style="margin-bottom: 10px" @click="handleSend" :disabled="isLoading">
          {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
        </button>

        <p class="redirect">
          <router-link to="/signin"><ArrowLeft />Back to Login</router-link>
        </p>
      </template>
      <template v-if="isSent">
        <h2>Check Your Email</h2>
        <p>We've sent a password reset link to {{ email }}</p>
        <p>
          <small>Click the link in the email to reset your password.</small>
        </p>

        <button style="margin-bottom: 10px" @click="handleResend" :disabled="isLoading">
          {{ isLoading ? 'Sending...' : 'Send Again' }}
        </button>

        <p class="redirect">
          <router-link
            to=""
            @click="
              () => {
                isSent = false
                error = ''
              }
            "
            ><ArrowLeft />Change Email</router-link
          >
        </p>
      </template>
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
      color: #0a0a0a;
      font-weight: 500;
      font-size: 16px;
    }

    p {
      color: #717182;
      font-size: 16px;
      font-weight: 500;
      margin: 24px 0 30px 0;
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
      margin-bottom: 6px;
      color: #4a5565;
      font-size: 14px;
      font-weight: 400;

      a {
        color: var(--primary-color);
        text-decoration: none;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 3px;
        transition: all 0.2s ease-in-out;

        &:hover {
          text-decoration: underline;
          gap: 6px;
        }
      }
    }

    &.sent {
      h2 {
        text-align: center;
      }

      p {
        text-align: center;
        font-weight: 400;
      }

      button {
        border: 1px solid #0000001A;
        background: #fff;
        color: #0A0A0A;
      }
    }
  }
}
</style>

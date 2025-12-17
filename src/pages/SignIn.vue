<script setup lang="ts">
import Logo from '../assets/logo.svg'
</script>

<template>
  <div class="container">
    <img :src="Logo" alt="Yarrow Logo" />

    <div class="form">
      <h2>API Platform</h2>
      <h1>Sign in to your account</h1>

      <label for="email">Email</label><br />
      <input type="text" id="email" />

      <div class="stack">
        <label for="password">Password</label>
        <router-link to="/forgot-password">Forgot password?</router-link>
      </div>
      <input type="password" id="email" />

      <button>Log In</button>

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

      &:hover {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
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

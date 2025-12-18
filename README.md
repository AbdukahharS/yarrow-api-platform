# Yarrow API Dashboard

A Vue 3 + TypeScript + Vite application with authentication pages.

## Demo Instructions

The authentication pages are fully functional with dummy data (no API integration).

### How to Test

1. **Register a New Account**
   - Navigate to `/register` or click "Sign up" from the sign-in page
   - Complete the 3-step registration process:
     - Step 1: Enter your email (e.g., `demo@example.com`)
     - Step 2: Create a password (min 6 characters) and confirm it
     - Step 3: Enter your company name
   - Account will be saved to localStorage
   - You'll be redirected to sign in

2. **Sign In**
   - Use the credentials you created during registration
   - Or create a dummy account first via the register flow
   - Successful login redirects to the dashboard
   - User session persists across page refreshes

3. **Forgot Password**
   - Enter a registered email address
   - System validates if the email exists
   - Shows confirmation screen (dummy email sent)
   - Option to resend or change email

### Features

- Full form validation with real-time error messages
- Loading states during simulated API calls
- Toast notifications for success messages
- Email validation
- Password confirmation matching
- Duplicate email detection during registration
- localStorage-based session persistence
- Protected routes with authentication guard
- Responsive design

### Demo Accounts

No pre-seeded accounts. Create your own via the registration flow.

---

## Development

This template uses Vue 3 `<script setup>` SFCs. Learn more:
- [Script Setup Docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [Vue TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup)

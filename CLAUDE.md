# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Yarrow API Dashboard is a Vue 3 + TypeScript + Vite application providing API management and analytics. It features user authentication, theme switching (light/dark mode), and dashboard pages for managing API keys, billing, support, and usage analytics.

**Current State**: Authentication and core UI are functional with localStorage-based dummy data. Backend API integration is pending.

## Development Commands

```bash
# Start development server
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

**Note**: There are currently no linting or testing scripts configured. Type-checking happens during build via `vue-tsc -b`.

## Architecture Overview

### Tech Stack
- **Framework**: Vue 3 with Composition API (`<script setup>` syntax)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **Routing**: Vue Router 4 with route guards
- **Charts**: Chart.js + Vue-ChartJS
- **Notifications**: Vue-Toastification
- **Icons**: SVG files with vite-svg-loader

### Project Structure

```
src/
├── main.ts              # Entry point
├── App.vue             # Root component with conditional layout
├── router.ts           # Route definitions with auth guards
├── style.css           # Global CSS variables (theme system)
│
├── composables/        # Composition API hooks
│   ├── useAuth.ts     # Authentication state & logic
│   └── useTheme.ts    # Theme management (light/dark)
│
├── components/         # Shared UI components
│   ├── Sidebar.vue    # Left navigation sidebar
│   ├── Header.vue     # Top header with theme toggle
│   └── ThemeToggle.vue
│
├── pages/             # Route components
│   ├── Dashboard.vue              # Main dashboard with charts
│   ├── APIKeys.vue               # API key CRUD management
│   ├── UsageAndAnalytics.vue    # Stub
│   ├── Billing.vue              # Stub
│   ├── Support.vue              # Stub
│   └── auth/
│       ├── SignIn.vue
│       ├── Register.vue         # Multi-step registration
│       └── ForgotPassword.vue
│
└── assets/
    ├── logo.svg
    └── icons/         # 18+ SVG icons
```

### Routing & Authentication

**Route Protection**: Routes are protected via `router.beforeEach()` guard in [router.ts](src/router.ts):
- Protected routes have `meta: { requiresAuth: true }`
- Unauthenticated users redirected to `/signin`
- Authenticated users trying to access `/signin` redirected to `/`
- Auth pages use `meta: { hideLayout: true }` for full-width layout

**Authentication**: Implemented in [useAuth.ts](src/composables/useAuth.ts) composable:
- **Storage**: localStorage-based (keys: `authUser`, `dummyUsers`)
- **State**: Reactive `isAuthenticated` ref
- **Methods**: `login()`, `logout()`, `checkAuth()`, `getCurrentUser()`
- **Initialization**: `initializeAuth()` runs on module load to restore session

**Important**: Authentication is currently client-side only. When integrating with a backend API:
1. Replace localStorage calls with API endpoints
2. Implement JWT or session token handling
3. Update `useAuth` composable to handle HTTP requests
4. Add error handling and token refresh logic

### Theme System

Implemented in [useTheme.ts](src/composables/useTheme.ts):
- **Modes**: Light (default) and dark
- **Persistence**: localStorage key `yarrow-theme`
- **Detection**: Falls back to system preference on first load
- **Implementation**: Toggles `.dark` class on `<html>` element
- **Styling**: CSS custom properties defined in [style.css](src/style.css) with separate `:root` and `:root.dark` declarations

**Chart Theme Sync**: Dashboard charts ([Dashboard.vue](src/pages/Dashboard.vue)) rebuild when theme changes to update colors.

### Component Patterns

All components follow modern Vue 3 patterns:
- `<script setup lang="ts">` syntax
- Composition API with `ref()`, `computed()`, `reactive()`
- Props via `defineProps<T>()`, events via `defineEmits<T>()`
- Scoped styles with CSS variables for theming

### SVG Icons

SVGs are loaded via `vite-svg-loader` with configuration in [vite.config.ts](vite.config.ts):
- **Default import**: Returns URL/path (`import icon from './icon.svg'`)
- **Component import**: Use `?component` suffix (`import Icon from './icon.svg?component'`)
- All icons stored in [src/assets/icons/](src/assets/icons/)

Example usage:
```vue
<script setup lang="ts">
import KeyIcon from '@/assets/icons/key.svg?component'
</script>

<template>
  <KeyIcon class="icon" />
</template>
```

## Key Implementation Notes

### Dashboard Charts
[Dashboard.vue](src/pages/Dashboard.vue) uses Chart.js with theme-aware colors:
- Line chart showing 7-day request volume
- Color values read from CSS custom properties
- `watchEffect()` rebuilds chart when theme changes
- Chart data currently uses dummy/static values

### API Keys Management
[APIKeys.vue](src/pages/APIKeys.vue) provides CRUD interface:
- Show/hide key toggle with eye icon
- Copy-to-clipboard functionality
- Delete confirmation (currently no backend)
- Key metadata: creation date, restrictions
- **TODO**: Connect to real API endpoints for persistence

### Multi-Step Registration
[Register.vue](src/pages/auth/Register.vue) implements 3-step flow:
1. Email input with validation
2. Password creation and confirmation
3. Company name
- Uses reactive `currentStep` ref
- Validates each step before proceeding
- Stores user in localStorage `dummyUsers` array

## Color System

Primary brand color: `#ff6900` (orange)

All colors defined as CSS variables in [style.css](src/style.css):
- `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`
- `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- `--color-border-primary`, `--color-border-secondary`
- `--color-success`, `--color-error`
- Shadow variables: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

Use these variables in component styles for automatic theme compatibility.

## Stub Pages

These pages have basic structure but need implementation:
- [Billing.vue](src/pages/Billing.vue)
- [Support.vue](src/pages/Support.vue)
- [UsageAndAnalytics.vue](src/pages/UsageAndAnalytics.vue)

When implementing, follow existing patterns from [Dashboard.vue](src/pages/Dashboard.vue) and [APIKeys.vue](src/pages/APIKeys.vue).

## Future Backend Integration

When connecting to a real API:
1. **Create API client**: Add axios/fetch wrapper in `src/services/` or `src/api/`
2. **Update composables**: Modify `useAuth` to call real endpoints
3. **Add environment variables**: Use `.env` files for API base URL
4. **Error handling**: Implement global error handling for HTTP failures
5. **Loading states**: Already present in auth pages, extend to other data fetching
6. **Type definitions**: Add TypeScript interfaces for API responses in `src/types/`

## TypeScript Configuration

- **Root**: [tsconfig.json](tsconfig.json) references app and node configs
- **App**: [tsconfig.app.json](tsconfig.app.json) with strict mode enabled
- **Vite types**: [vite-env.d.ts](src/vite-env.d.ts) declares SVG import types

When adding new file types or global types, update [vite-env.d.ts](src/vite-env.d.ts).

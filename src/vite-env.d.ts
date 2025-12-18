/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.svg?url' {
  const src: string
  export default src
}

declare module '*.svg?raw' {
  const src: string
  export default src
}

declare module '*.svg?file' {
  const src: string
  export default src
}

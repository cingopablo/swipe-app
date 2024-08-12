import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    viewportWidth: 1100,
    viewportHeight: 900,
  },
})

import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            filename: './dist/stats.html',
            open: true,
        }),
    ],
    server: {
        port: 3000
    },
    build: {
        outDir: 'dist'
    }
})
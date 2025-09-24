import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //preview: {
   // port: 5173, // <- тук задаваш порта за `npm run preview`
   // strictPort: true, // ако портът е зает, ще хвърли грешка вместо да избере друг
  //},
})

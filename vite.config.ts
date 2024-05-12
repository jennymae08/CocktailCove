import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/collection.html',
        getStarted: 'src/index.html',
        splashscreen: 'src/splashScreen.html',
        login: 'src/login.html',
        register: 'src/register.html',
        recipe: 'src/recipe.html',
        profile: 'src/profile.html',
        profile1: 'src/profile1.html',
        favorites: 'src/favorites.html',
        more: 'src/more.html',
        upload: 'src/upload.html',
      }
    }
  },
});

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
        recipe1: 'src/recipe.html',
        recipe2: 'src/barbieDrink.html',
        recipe3: 'src/ginUniverse.html',
        recipe4: 'src/gsmMargarita.html',
        recipe5: 'src/tiaMaria.html',
        recipe6: 'src/zombieCocktail.html',
        profile: 'src/profile.html',
        profile1: 'src/profile1.html',
        favorites: 'src/favorites.html',
        more: 'src/more.html',
        upload: 'src/upload.html',
      }
    }
  },
});

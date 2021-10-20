<script setup lang="ts">
import RouterLink from './components/RouterLink.vue';
</script>

<template>
  <div class="fixed flex flex-col w-full h-full text-xs blur bg-gradient-to-r from-purple-400 via-pink-400 via-green-400 to-red-400">
    <div class="flex-auto p-4 overflow-y-auto">
      <router-view/>
    </div>

    <div class="flex justify-center flex-none bg-white bg-opacity-50">
      <RouterLink
        to="/"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/about"
      >
        About
      </RouterLink>

      <RouterLink
        to="/signup"
      >
        Signup
      </RouterLink>

      <RouterLink
        to="/login"
      >
        Login
      </RouterLink>
    </div>
  </div>
</template>

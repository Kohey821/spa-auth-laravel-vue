<template>
  <div class="fixed flex flex-col w-full h-full text-xs blur bg-gradient-to-r from-purple-400 via-pink-400 via-green-400 to-red-400">
    <div class="flex-auto p-4 overflow-y-auto">
      <router-view/>
    </div>

    <div class="flex justify-center flex-none bg-white bg-opacity-50">
      <router-link
        class="p-3 hover:bg-pink-500 hover:text-white transition-colors"
        to="/"
      >
        Home
      </router-link>

      <router-link
        class="p-3 hover:bg-pink-500 hover:text-white transition-colors"
        to="/about"
      >
        About
      </router-link>

      <router-link
        class="p-3 hover:bg-pink-500 hover:text-white transition-colors"
        to="/signup"
      >
        Signup
      </router-link>

      <router-link
        class="p-3 hover:bg-pink-500 hover:text-white transition-colors"
        to="/login"
      >
        Login
      </router-link>
    </div>
  </div>
</template>

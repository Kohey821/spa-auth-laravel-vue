<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const about = ref<string | unknown>('');
onMounted(async () => {
  try {
    const aboutResponse = await axios.get('/api/about');
    about.value = aboutResponse.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.dir(error);
    } else {
      console.dir(error);
    }
  }
});
</script>

<template>
  <div class="about">
    {{ about }}
  </div>
</template>

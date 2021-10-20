<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Box from '@/components/Box.vue';

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
  <Box>
    {{ about }}
  </Box>
</template>

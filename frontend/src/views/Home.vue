<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import Box from '@/components/Box.vue';
import Heading from '@/components/Heading.vue';

const store = useStore();
const currentUser = computed(() => store.state.currentUser);
</script>

<template>
  <Box>
    <Heading>
      ホーム
    </Heading>

    <template v-if="currentUser">
      ようこそ{{ currentUser.name }}さん
    </template>
  </Box>
</template>

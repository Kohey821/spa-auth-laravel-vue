<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import axios, { AxiosError } from 'axios';
import BoxCentered from '@/components/BoxCentered.vue';
import Heading from '@/components/Heading.vue';
import FormInput from '@/components/FormInput.vue';

const email = ref<string>('');
const name = ref<string>('');
const password = ref<string>('');
const passwordConfirmation = ref<string>('');

// TODO: バリデーション
watchEffect(() => {
  console.log(email.value);
});
watchEffect(() => {
  console.log(name.value);
});
watchEffect(() => {
  console.log(password.value);
});
watchEffect(() => {
  console.log(passwordConfirmation.value);
});

// TODO: コンポジション化
function handleError(error: AxiosError | unknown) {
  const { dir } = console;

  if (axios.isAxiosError(error)) {
    dir(error);
  } else {
    dir(error);
  }
}
async function initCsrfProction() {
  const { log } = console;

  try {
    const result = await axios({
      method: 'GET',
      url: '/sanctum/csrf-cookie',
    });

    log('csrf保護初期化成功');
    return result;
  } catch (error) {
    return handleError(error);
  }
}
async function handleSubmit() {
  await initCsrfProction();
}
</script>

<template>
  <BoxCentered>
    <Heading>
      サイナップ
    </Heading>

    <form
      @submit.prevent="handleSubmit"
    >
      <FormInput
        name="name"
        type="text"
        placeholder="名前"
        v-model:modelValue="name"
      />
      <FormInput
        name="email"
        type="email"
        placeholder="Eメール"
        v-model:modelValue="email"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="パスワード"
        v-model:modelValue="password"
      />
      <FormInput
        name="passwordConfirmation"
        type="password"
        placeholder="パスワード確認"
        v-model:modelValue="passwordConfirmation"
      />

      <!-- TODO: コンポーネント化 -->
      <button
        class="w-full py-2 mt-1 text-base text-white bg-blue-500 rounded shadow-md"
      >
        送信
      </button>
    </form>
  </BoxCentered>
</template>

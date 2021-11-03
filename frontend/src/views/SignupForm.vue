<script setup lang="ts">
import { useRouter } from 'vue-router';
import axios, { AxiosResponse } from 'axios';
import useInitCsrfProtection from '@/compositions/useInitCsrfProtection';
import useValidation from '@/compositions/useValidation';
import useValidator from '@/compositions/useValidator';
import Box from '@/components/Box.vue';
import Heading from '@/components/Heading.vue';
import FormInput from '@/components/FormInput.vue';
import FormButton from '@/components/FormButton.vue';

const {
  email: emailValidator,
  minLength: minLengthValidator,
  required: requiredValidator,
  same: sameValidator,
} = useValidator();

// TODO: submit時のバリデーション
const {
  errors: emailErrors,
  input: email,
  register: registerEmail,
} = useValidation();
registerEmail([emailValidator(), requiredValidator()]);
const {
  errors: nameErrors,
  input: name,
  register: registerName,
} = useValidation();
registerName([requiredValidator()]);
const {
  errors: passwordErrors,
  input: password,
  register: registerPassword,
} = useValidation();
registerPassword([minLengthValidator({ length: 8 })]);
const {
  errors: passwordConfirmationErrors,
  input: passwordConfirmation,
  register: registerPasswordConfirmation,
} = useValidation();
registerPasswordConfirmation([sameValidator({ prefix: 'パスワード', target: password })]);

const {
  errorMessage: csrfError,
  initCsrfProtection,
} = useInitCsrfProtection();

const router = useRouter();

async function handleSubmit() {
  const { dir, log } = console;

  if (!await initCsrfProtection()) {
    return;
  }

  try {
    await axios({
      method: 'POST',
      url: '/register',
      data: {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
    });

    router.push({ name: 'home' });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { data } = error.response as AxiosResponse;
      const { errors } = data as any;
      if (errors) {
        ({
          name: nameErrors.value,
          email: emailErrors.value,
          password: passwordErrors.value,
        } = errors);
      } else {
        log('axios error');
        dir(error);
      }
    } else {
      log('general error');
      dir(error);
    }
  }
}
</script>

<template>
  <Box>
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
        :errors="nameErrors"
      />
      <FormInput
        name="email"
        type="email"
        placeholder="Eメール"
        v-model:modelValue="email"
        :errors="emailErrors"
      />
      <FormInput
        name="password"
        type="password"
        placeholder="パスワード"
        v-model:modelValue="password"
        :errors="passwordErrors"
      />
      <FormInput
        name="passwordConfirmation"
        type="password"
        placeholder="パスワード確認"
        v-model:modelValue="passwordConfirmation"
        :errors="passwordConfirmationErrors"
      />

      <FormButton
        :error="csrfError"
      >
        送信
      </FormButton>
    </form>
  </Box>
</template>

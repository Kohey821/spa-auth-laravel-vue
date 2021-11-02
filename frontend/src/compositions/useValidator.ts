import { Ref, ref } from 'vue';

export type ValidatorFunction = (value: string) => string;

export type ValidatorArguments = {
  length?: number,
  prefix?: string,
  target?: Ref<string>,
};

export type Validator = (args?: ValidatorArguments) => ValidatorFunction;

export type UseValidator = {
  [key: string]: Validator
};

export default function (): UseValidator {
  const email: Validator = () => (
    (value) => {
      if (!value.match(/^\S+@\S+$/g)) {
        return 'メールアドレスを入力してください';
      }

      return '';
    }
  );

  const minLength: Validator = (args) => (
    (value) => {
      const { length = 8 } = args as ValidatorArguments;
      if (value.length < length) {
        return `${length}文字以上入力してくだい`;
      }

      return '';
    }
  );

  const required: Validator = () => (
    (value) => {
      if (!value.length) {
        return '入力してください';
      }

      return '';
    }
  );

  const same: Validator = (args) => (
    (value) => {
      const { prefix, target = ref('') } = args as ValidatorArguments;
      if (value !== target.value) {
        return `${prefix}が違います`;
      }

      return '';
    }
  );

  return {
    email,
    minLength,
    required,
    same,
  };
}

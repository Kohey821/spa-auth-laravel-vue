import { Ref, ref, watch } from 'vue';
import { Validate } from './useValidator';

export type Register = (validators: Array<Validate>) => void;

export type UseValidation = {
  errors: Ref<string[]>
  input: Ref<string>
  register: Register
};

export default function (): UseValidation {
  const errors = ref<string[]>([]);

  const input = ref('');

  const register: Register = (validates) => {
    watch(input, (newValue) => {
      validates.forEach((validate) => {
        errors.value = [];

        const error = validate(newValue);
        if (error) {
          errors.value.push(error);
        }
      });
    });
  };

  return {
    errors,
    input,
    register,
  };
}

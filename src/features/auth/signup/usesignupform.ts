import { UseFormReturnType, useForm } from '@mantine/form';

export interface ISignupFormDetails {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const useSignupForm = (): UseFormReturnType<ISignupFormDetails> => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val: string) =>
        val.length < 6 ? 'Password should include at least 6 characters' : null,
      confirmPassword: (val: string, { password }) =>
        val !== password ? 'Passwords do not match' : null,
      terms: (terms: boolean) =>
        !terms ? 'You need to accept terms and conditions' : null,
    },
  });

  return form;
};
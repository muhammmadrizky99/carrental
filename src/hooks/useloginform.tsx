import { useForm } from '@mantine/form';

export const useLoginForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  return form;
};
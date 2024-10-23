// 'use client';
// import { Checkbox, PasswordInput, Stack, TextInput } from '@mantine/core';
// import { UseFormReturnType } from '@mantine/form';
// import { ISignupFormDetails } from './useSignupForm';

// interface Props {
//   form: UseFormReturnType<ISignupFormDetails>;
// }
// export const AuthDetails = ({ form }: Props) => {
//   return (
//     <Stack>
//       <TextInput
//         label="Email"
//         placeholder="hello@cargo.com"
//         value={form.values.email}
//         onChange={(event) =>
//           form.setFieldValue('email', event.currentTarget.value)
//         }
//         error={form.errors.email && form.errors.email}
//         radius="md"
//       />

//       <PasswordInput
//         label="Password"
//         placeholder="Your password"
//         value={form.values.password}
//         onChange={(event) =>
//           form.setFieldValue('password', event.currentTarget.value)
//         }
//         error={
//           form.errors.password &&
//           'Password should include at least 6 characters'
//         }
//         radius="md"
//       />
//       <PasswordInput
//         label="Confirm Password"
//         placeholder="Confirm Your password"
//         value={form.values.confirmPassword}
//         onChange={(event) =>
//           form.setFieldValue('confirmPassword', event.currentTarget.value)
//         }
//         error={form.errors.confirmPassword && 'Passwords do not match'}
//         radius="md"
//       />

//       <Checkbox
//         label="I accept terms and conditions"
//         checked={form.values.terms}
//         onChange={(event) =>
//           form.setFieldValue('terms', event.currentTarget.checked)
//         }
//         error={form.errors.terms && 'You need to accept terms and conditions'}
//       />
//     </Stack>
//   );
// };
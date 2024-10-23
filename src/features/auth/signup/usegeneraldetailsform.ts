import { UseFormReturnType, useForm } from '@mantine/form';

export interface IGeneralFormDetail {
  firstName: string;
  lastName: string;
  country_id: string;
  region_id: string;
  phone: string;
  city: string;
  street: string;
}

export const useGeneralDetailsForm =
  (): UseFormReturnType<IGeneralFormDetail> => {
    const form = useForm({
      initialValues: {
        firstName: '',
        lastName: '',
        country_id: '',
        region_id: '',
        phone: '',
        city: '',
        street: '',
      },

      validate: {
        firstName: (value: string) =>
          !value ? 'First Name is required' : null,
        lastName: (value: string) => (!value ? 'Last Name is required' : null),
        phone: (value: string) => (!value ? 'Phone number is required' : null),
        country_id: (value: string) => (!value ? 'Select your country' : null),
        region_id: (value: string) => (!value ? 'Select your region' : null),
        city: (value: string) => (!value ? 'Enter your city name' : null),
      },
    });

    return form;
  };
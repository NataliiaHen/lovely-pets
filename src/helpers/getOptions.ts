import { SelectOption } from '../types/SelectOptions';

export const getOptions = (values: string[]) => {
  const newOptions: SelectOption[] = values.map(region => ({
    value: region,
    label: region,
  }));

  return newOptions;
};

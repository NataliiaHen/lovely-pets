import { PetFormData } from '../types/PetForm';

export const appendFormData = (data: PetFormData) => {
  const formData: FormData = new FormData();

  const handleData = (dataToHandle: PetFormData) => {
    Object.keys(dataToHandle).forEach(key => {
      if (key === 'images') {
        dataToHandle[key].forEach(image => {
          const imageKey = 'images';

          if (image instanceof File) {
            formData.append(imageKey, image);
          }
        });
      } else if (
        typeof dataToHandle[key as keyof PetFormData] === 'object' &&
        !Array.isArray(data[key as keyof PetFormData])
      ) {
        const serializedObject = JSON.stringify(
          dataToHandle[key as keyof PetFormData],
        );

        formData.append(
          'post',
          new Blob([serializedObject], {
            type: 'application/json',
          }),
        );
      } else {
        formData.append(key, dataToHandle[key as keyof PetFormData] as any);
      }
    });
  };

  handleData(data);

  return formData;
};

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Pet, PetsData } from '../types/Pet';
// import { PickUpFormFields } from '../types/PickUpForm';
// import { ContactForm } from '../types/ContactForm';

// export const BASE_API_URL = 'https://pets-home-production.up.railway.app';

// const PET_PATH = 'animal_posts';

// type PageParams = {
//   page?: number,
//   size?: number,
//   sort?: string
// };

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_API_URL,
//   }),
//   tagTypes: ['Pets'],
//   endpoints: (builder) => ({
//     getPets: builder.query<PetsData, PageParams | void>({
//       query: (params) => {
//         const page = params?.page || 0;
//         // const size = params?.size || 9;
//         const sort = params?.sort || 'id,asc';

//         return `${PET_PATH}?page=${page}&sort=${sort}`;
//       },
//       providesTags: (result: PetsData | undefined) => {
//         if (result) {
//           return [
//             ...result.content.map(({ id }) => ({ type: 'Pets' as const, id })),
//             { type: 'Pets', id: 'LIST' },
//           ];
//         }

//         return [{ type: 'Pets', id: 'LIST' }];
//       },
//     }),
//     getFilterPets: builder.query<PetsData, string>({
//       query: (searchParams) => `/${PET_PATH}/search?${searchParams}`,
//     }),
//     getPet: builder.query<Pet, number>({
//       query: (petId) => `/${PET_PATH}/${petId}`,
//     }),
//     addNewPet: builder.mutation<unknown, FormData>({
//       query: (initialPost) => ({
//         url: PET_PATH,
//         method: 'POST',
//         body: initialPost,
//         formData: true,
//       }),
//       invalidatesTags: ['Pets'],
//     }),
//     pickUpRequest: builder.mutation<unknown, PickUpFormFields>({
//       query: (data) => ({
//         url: `${PET_PATH}/${data.id}/adopt`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     contactUsRequest: builder.mutation<unknown, ContactForm>({
//       query: (data) => ({
//         url: 'contact_us',
//         method: 'POST',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetPetsQuery, useGetPetQuery,
//   useGetFilterPetsQuery, useAddNewPetMutation,
//   usePickUpRequestMutation, useContactUsRequestMutation,
// } = apiSlice;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Pet, PetsData } from '../types/Pet';
// import { PickUpFormFields } from '../types/PickUpForm';
// import { ContactForm } from '../types/ContactForm';

// export const BASE_API_URL = 'https://pets-home-production.up.railway.app';

// const PET_PATH = 'animal_posts';

// type PageParams = {
//   page?: number;
//   size?: number;
//   sort?: string;
// };

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_API_URL,
//   }),
//   tagTypes: ['Pets'],
//   endpoints: (builder) => ({
//     getPets: builder.query<PetsData, PageParams | void>({
//       query: (params) => {
//         const { page = 0, sort = 'id,asc' } = params ?? {};

//         return `${PET_PATH}?page=${page}&sort=${sort}`;
//       },
//       providesTags: (result: PetsData | undefined) => {
//         if (result) {
//           return [
//             ...result.content.map(({ id }) => ({ type: 'Pets' as const, id })),
//             { type: 'Pets', id: 'LIST' },
//           ];
//         }

//         return [{ type: 'Pets', id: 'LIST' }];
//       },
//     }),
//     getFilterPets: builder.query<PetsData, string>({
//       query: (searchParams) => `/${PET_PATH}/search?${searchParams}`,
//     }),
//     getPet: builder.query<Pet, number>({
//       query: (petId) => `/${PET_PATH}/${petId}`,
//     }),
//     addNewPet: builder.mutation<unknown, FormData>({
//       query: (initialPost) => ({
//         url: PET_PATH,
//         method: 'POST',
//         body: initialPost,
//         formData: true,
//       }),
//       invalidatesTags: ['Pets'],
//     }),
//     pickUpRequest: builder.mutation<unknown, PickUpFormFields>({
//       query: (data) => ({
//         url: `${PET_PATH}/${data.id}/adopt`,
//         method: 'POST',
//         body: data,
//       }),
//     }),
//     contactUsRequest: builder.mutation<unknown, ContactForm>({
//       query: (data) => ({
//         url: 'contact_us',
//         method: 'POST',
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetPetsQuery,
//   useGetPetQuery,
//   useGetFilterPetsQuery,
//   useAddNewPetMutation,
//   usePickUpRequestMutation,
//   useContactUsRequestMutation,
// } = apiSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pet, PetsData } from '../types/Pet';
import { PickUpFormFields } from '../types/PickUpForm';
import { ContactForm } from '../types/ContactForm';

export const BASE_API_URL = 'https://pets-home-production.up.railway.app';

const PET_PATH = 'animal_posts';

type PageParams = {
  page?: number;
  size?: number | null;
  sort?: string;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ['Pets'],
  endpoints: builder => ({
    getPets: builder.query<PetsData, PageParams | void>({
      // query: params => {
      //   const { page = 0, sort = 'id,asc', size = 10 } = params ?? {};

      //   return `${PET_PATH}?page=${page}&sort=${sort}&size=${size}`;
      // },
      query: params => {
        // Build query parameters if any are provided
        const queryParams = [];

        if (params) {
          if (params.page !== undefined) {
            queryParams.push(`page=${params.page}`);
          }

          if (params.sort !== undefined) {
            queryParams.push(`sort=${params.sort}`);
          }

          if (params.size !== undefined) {
            queryParams.push(`size=${params.size}`);
          }
        }

        // Concatenate query parameters (if any) to base URL
        const url =
          queryParams.length > 0
            ? `${PET_PATH}?${queryParams.join('&')}`
            : PET_PATH;

        return url;
      },
      providesTags: (result: PetsData | undefined) => {
        if (result) {
          return [
            ...result.content.map(({ id }) => ({ type: 'Pets' as const, id })),
            { type: 'Pets', id: 'LIST' },
          ];
        }

        return [{ type: 'Pets', id: 'LIST' }];
      },
    }),
    getFilterPets: builder.query<PetsData, string>({
      query: searchParams => `/${PET_PATH}/search?${searchParams}`,
    }),
    getPet: builder.query<Pet, number>({
      query: petId => `/${PET_PATH}/${petId}`,
    }),
    addNewPet: builder.mutation<unknown, FormData>({
      query: initialPost => ({
        url: PET_PATH,
        method: 'POST',
        body: initialPost,
        formData: true,
      }),
      invalidatesTags: ['Pets'],
      // Automatically refetch pets data when a new pet is added
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     await dispatch(apiSlice.endpoints.getPets.initiate());
      //   } catch (error) {
      //     throw error;
      //   }
      // },
    }),
    pickUpRequest: builder.mutation<unknown, PickUpFormFields>({
      query: data => ({
        url: `${PET_PATH}/${data.id}/adopt`,
        method: 'POST',
        body: data,
      }),
    }),
    contactUsRequest: builder.mutation<unknown, ContactForm>({
      query: data => ({
        url: 'contact_us',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPetsQuery,
  useGetPetQuery,
  useGetFilterPetsQuery,
  useAddNewPetMutation,
  usePickUpRequestMutation,
  useContactUsRequestMutation,
} = apiSlice;

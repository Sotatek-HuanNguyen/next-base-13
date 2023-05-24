import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  AuthResponse,
  ForgotRequest,
  LoginRequest,
  RegisterRequest,
  ResetRequest,
  User,
} from '../../interfaces/auth';
import { RootState } from '../store';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterRequest>({
      query: ({ username, email, password }) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: { username, email, password },
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: ({ identifier, password }) => ({
        url: '/auth/local',
        method: 'POST',
        body: { identifier, password },
      }),
      invalidatesTags: ['User'],
    }),

    getUser: builder.query<User, string>({
      query: (id) => `/${id}`,
      providesTags: ['User'],
    }),

    getGoogle: builder.query<any, void>({
      query: () => ({ url: '/strapi-google-auth/init' }),
      providesTags: ['User'],
    }),

    forgotPassword: builder.mutation<{ ok: boolean }, ForgotRequest>({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['User'],
    }),

    resetPassword: builder.mutation<any, ResetRequest>({
      query: ({ code, password, passwordConfirmation }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { code, password, passwordConfirmation },
      }),
      invalidatesTags: ['User'],
    }),

    // updateUser: builder.mutation<void, User>({
    //   query: ({ id, name, email, password }) => ({
    //     url: `/${id}`,
    //     method: "PUT",
    //     body: { name, email, password },
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    // deleteUser: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useLazyGetGoogleQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  // useUpdateUserMutation,
  // useDeleteUserMutation,
} = userApi;

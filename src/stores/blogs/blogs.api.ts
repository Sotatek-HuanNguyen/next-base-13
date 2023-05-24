import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { RootState } from '../store';
import { ViewBlogResponse } from './../../interfaces/blog';

export const blogsApi = createApi({
  reducerPath: 'blogsApi',
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
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Blogs', 'Blog'],
  endpoints: (builder) => ({
    getBlogsPath: builder.query<any, void>({
      query: () => `/blogs`,
      providesTags: ['Blog'],
    }),

    getBlog: builder.query<any, string | string[]>({
      query: (slug) => `/blogs?populate=*&filters[slug][$eq]=${slug}`,
      providesTags: ['Blog'],
    }),

    createBlog: builder.mutation<ViewBlogResponse, FormData>({
      query: (data) => ({
        url: '/blogs',
        method: 'POST',
        body: data,
      }),
    }),

    viewBlog: builder.mutation<ViewBlogResponse, { id: number }>({
      query: ({ id }) => ({
        url: `/view-blog/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetBlogQuery,
  useViewBlogMutation,
  useCreateBlogMutation,
  util: { getRunningQueriesThunk },
} = blogsApi;

// export endpoints for use in SSR
export const { getBlogsPath, getBlog, viewBlog } = blogsApi.endpoints;

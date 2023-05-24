import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  Comment,
  CommentRequest,
  CommentResponse,
  ReportRequest,
  ReportResponse,
} from '../../interfaces/comment';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.token;

    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getAllComment: builder.query<Comment[], string>({
      query: (id) => `/comments/api::blog.blog:${id}`,
      providesTags: ['Comment'],
    }),

    postComment: builder.mutation<CommentResponse, CommentRequest>({
      query: ({ id, content, author }) => ({
        url: `/comments/api::blog.blog:${id}`,
        method: 'POST',
        body: { content, author },
      }),
      invalidatesTags: ['Comment'],
    }),

    reportComment: builder.mutation<ReportResponse, ReportRequest>({
      query: ({ postId, commentId, report }) => ({
        url: `/comments/api::blog.blog:${postId}/comment/${commentId}/report-abuse`,
        method: 'POST',
        body: report,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { usePostCommentMutation, useReportCommentMutation, useGetAllCommentQuery } =
  commentApi;

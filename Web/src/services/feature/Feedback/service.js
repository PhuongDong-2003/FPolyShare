import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FeedbackAPI = createApi({
  reducerPath: "feedbackAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/feedbacks",
    timeout: 10_000,
  }),
  tagTypes: ["Feedbacks"],
  endpoints: (builder) => ({
    getFeedback: builder.query({
      query: (id) => ({
        url: "",
        method: "GET",
        params: {
          product_id: id,
        }
      }),

      transformResponse: (response) => response[0],

      transformErrorResponse: (response) => response,
    }),

    createFeedback: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),

      transformResponse: (response) => response,

      transformErrorResponse: (response) => response,
    })
  }),
});

export const { 
  useGetFeedbackQuery,
  useCreateFeedbackMutation
} = FeedbackAPI;

export default FeedbackAPI;
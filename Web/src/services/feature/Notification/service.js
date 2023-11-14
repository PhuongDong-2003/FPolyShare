import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NotificationAPI = createApi({
  reducerPath: "NotificationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/notifications" }),
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "",
        method: "GET"
      }),

      transformResponse: (response) => response,

      transformErrorResponse: (response) => response,
    })
  })
});

export const {
  useGetNotificationsQuery
} = NotificationAPI;

export default NotificationAPI;
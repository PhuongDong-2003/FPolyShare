import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TechAPI = createApi({
  reducerPath: "techAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3030/techs",
    timeout: 10_000,
  }),
  tagTypes: ["Techs"],
  endpoints: (builder) => ({
    getTechs: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),

      transformResponse: (response) => response,

      transformErrorResponse: (response) => response,
    })
  }),
});

export const { 
  useGetTechsQuery
} = TechAPI;

export default TechAPI;
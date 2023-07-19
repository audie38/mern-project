import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Note", "User"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});

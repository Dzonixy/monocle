// Utils
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Constants
import { USER, USERS_API } from "constants/index";

export const usersApi = createApi({
  reducerPath: USERS_API,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
    prepareHeaders: (headers, _) => headers,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => USER,
      transformResponse: (res) => res.data.users,
    }),
    getUser: builder.query({
      query: (id) => `${USER}/${id}`,
    }),
  }),
});

export const { useGetUsersQuery: useGetUsers, useGetUserQuery: useGetUser } =
  usersApi;

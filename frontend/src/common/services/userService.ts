import { LoginModel } from "./../../modules/login/models/loginModel";
import { UserModel } from "./../../modules/login/models/userModel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../constant/baseUrl";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl.API }),
  endpoints: (builder) => ({
    login: builder.mutation<UserModel, LoginModel>({
      query: (data: LoginModel) => ({
        method: "GET",
        url: `users/authenticate`,
        params: data,
      }),
    }),
    register: builder.mutation<UserModel, LoginModel>({
      query: (data: LoginModel) => ({
        method: "POST",
        url: `users`,
        body: data,
      }),
    }),
    getAllUsers: builder.query<UserModel, LoginModel>({
      query: (data: LoginModel) => ({ url: `authenticate`, params: data }),
    }),
  }),
});
export const { useGetAllUsersQuery, useLoginMutation, useRegisterMutation } =
  userApi;

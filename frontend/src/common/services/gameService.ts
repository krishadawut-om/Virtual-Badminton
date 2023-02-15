import { leaderboardModel } from "./../../modules/rank/models/leaderboardModel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../constant/baseUrl";
import { GameModel } from "../models/gameModel";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl.API + "/games" }),
  endpoints: (builder) => ({
    getAll: builder.mutation<GameModel[], undefined>({
      query: () => ({
        method: "GET",
        url: ``,
      }),
    }),
    getById: builder.mutation<GameModel, string>({
      query: (id: string) => ({
        method: "GET",
        url: `/${id}`,
      }),
    }),
    getTotalPlayingTime: builder.mutation<number, string>({
      query: (id: string) => ({
        method: "GET",
        url: `/${id}/totalPlayingTime`,
      }),
    }),
    getGameHistories: builder.mutation<GameModel[], string>({
      query: (id: string) => ({
        method: "GET",
        url: `/${id}/gameHistories`,
      }),
    }),
    getLeaderboard: builder.mutation<leaderboardModel[], {}>({
      query: () => ({
        method: "GET",
        url: `/leaderboard`,
      }),
    }),
    createGame: builder.mutation<GameModel, GameModel>({
      query: (data: GameModel) => ({
        method: "POST",
        url: ``,
        body: data,
      }),
    }),
  }),
});
export const {
  useCreateGameMutation,
  useGetAllMutation,
  useGetByIdMutation,
  useGetGameHistoriesMutation,
  useGetLeaderboardMutation,
  useGetTotalPlayingTimeMutation,
} = gameApi;

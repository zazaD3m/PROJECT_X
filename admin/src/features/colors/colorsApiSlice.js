/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { COLORS_URL } from "../../lib/constants";

const colorsAdapter = createEntityAdapter({
  selectId: (color) => color._id,
});

const initialState = colorsAdapter.getInitialState();

const colorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColors: builder.query({
      query: () => `${COLORS_URL}`,
      transformResponse: (responseData) => {
        return colorsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Color", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Color", id })),
            ]
          : [{ type: "Color", id: "LIST" }],
    }),
    getColorById: builder.query({
      query: (colorId) => `${COLORS_URL}/color/${colorId}`,
    }),
    createColor: builder.mutation({
      query: ({ colorName, hexValue }) => ({
        url: `${COLORS_URL}`,
        method: "POST",
        body: { colorName, hexValue },
      }),
      invalidatesTags: [{ type: "Color", id: "LIST" }],
    }),
    updateColor: builder.mutation({
      query: ({ colorId, colorName, hexValue }) => ({
        url: `${COLORS_URL}/color/${colorId}`,
        method: "PUT",
        body: { colorName, hexValue },
      }),
      async onQueryStarted(
        { colorId, colorName, hexValue },
        { dispatch, queryFulfilled },
      ) {
        const putResult = dispatch(
          colorsApiSlice.util.updateQueryData(
            "getColorById",
            colorId,
            (draft) => {
              draft.colorName = colorName;
              draft.hexValue = hexValue;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch (err) {
          putResult.undo();
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Color", id: "LIST" }],
    }),
    deleteColor: builder.mutation({
      query: ({ colorId }) => ({
        url: `${COLORS_URL}/color/${colorId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Color", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateColorMutation,
  useUpdateColorMutation,
  useGetColorsQuery,
  useGetColorByIdQuery,
  useDeleteColorMutation,
} = colorsApiSlice;

export const selectColorsResult = colorsApiSlice.endpoints.getColors.select();

export const selectColorsData = createSelector(
  selectColorsResult,
  (colorsResult) => colorsResult.data,
);

export const {
  selectAll: selectAllColors,
  selectById: selectColorById,
  selectEntities: selectColorEntities,
  selectIds: selectColorIds,
  selectTotal: selectTotalColors,
} = colorsAdapter.getSelectors(
  (state) => selectColorsData(state) ?? initialState,
);

/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { CATEGORIES_URL } from "../../lib/constants";

const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category._id,
  sortComparer: (a, b) => a.mainCategoryName.localeCompare(b.mainCategoryName),
});

const initialState = categoriesAdapter.getInitialState();

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `${CATEGORIES_URL}`,
      transformResponse: (responseData) => {
        return categoriesAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Category", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Category", id })),
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    // getColorById: builder.query({
    //   query: (colorId) => `${COLORS_URL}/color/${colorId}`,
    // }),
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    // updateColor: builder.mutation({
    //   query: ({ colorId, colorName, hexValue }) => ({
    //     url: `${COLORS_URL}/color/${colorId}`,
    //     method: "PUT",
    //     body: { colorName, hexValue },
    //   }),
    //   async onQueryStarted(
    //     { colorId, colorName, hexValue },
    //     { dispatch, queryFulfilled },
    //   ) {
    //     const putResult = dispatch(
    //       colorsApiSlice.util.updateQueryData(
    //         "getColorById",
    //         colorId,
    //         (draft) => {
    //           draft.colorName = colorName;
    //           draft.hexValue = hexValue;
    //         },
    //       ),
    //     );
    //     try {
    //       await queryFulfilled;
    //     } catch (err) {
    //       putResult.undo();
    //     }
    //   },
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Color", id: arg.colorId },
    //   ],
    // }),
    // deleteColor: builder.mutation({
    //   query: ({ colorId }) => ({
    //     url: `${COLORS_URL}/color/${colorId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     { type: "Color", id: arg.colorId },
    //   ],
    // }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categoriesApiSlice;

export const selectCategoriesResult =
  categoriesApiSlice.endpoints.getCategories.select();

export const selectCategoriesData = createSelector(
  selectCategoriesResult,
  (categoriesResult) => categoriesResult.data,
);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectEntities: selectCategoryEntities,
  selectIds: selectCategoryIds,
  selectTotal: selectTotalCategories,
} = categoriesAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState,
);
/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { PRODUCTS_URL } from "../../lib/constants";

const productsAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState();

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `${PRODUCTS_URL}`,
      transformResponse: (responseData) => {
        return productsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Product", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Product", id })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (productId) => `${PRODUCTS_URL}/product/${productId}`,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ productData, productId }) => ({
        url: `${PRODUCTS_URL}/product/${productId}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.productId },
      ],
    }),
    deleteProduct: builder.mutation({
      query: ({ productId }) => ({
        url: `${PRODUCTS_URL}/product/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.productId },
      ],
    }),
    deleteProductImage: builder.mutation({
      query: ({ productId, public_id, imageIndex }) => ({
        url: `${PRODUCTS_URL}/product/image`,
        method: "DELETE",
        body: { productId, public_id, imageIndex },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.productId },
      ],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
} = productsApiSlice;

export const selectProductsResult =
  productsApiSlice.endpoints.getProducts.select();

export const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data, // normalized state object with ids & entities
);

export const {
  selectAll: selectAllProducts, // maps over ids array, and returns sorted array of entities
  selectById: selectProductById, // needs state and entity ID , returns entity with that ID
  selectEntities: selectProductEntities, // returns entities lookup table
  selectIds: selectProductIds, // selects array of ids
  selectTotal: selectTotalProducts, // returns total num of entities stored in state

  // Pass in a selector that returns the products slice of state
} = productsAdapter.getSelectors(
  (state) => selectProductsData(state) ?? initialState,
);

/* eslint-disable no-unused-vars */
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

import { ORDERS_URL } from "../../lib/constants";

const ordersAdapter = createEntityAdapter({
  selectId: (order) => order._id,
});

const initialState = ordersAdapter.getInitialState();

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => `${ORDERS_URL}`,
      transformResponse: (responseData) => {
        return ordersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Order", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Order", id })),
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    getOrderById: builder.query({
      query: (orderId) => `${ORDERS_URL}/order/${orderId}`,
      providesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
    getUserOrders: builder.query({
      query: (orderId) => `${ORDERS_URL}/user-orders`,
      providesTags: (result, error, arg) => [{ type: "Order", id: arg }],
    }),
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
    updateOrder: builder.mutation({
      query: ({ orderData, orderId }) => ({
        url: `${ORDERS_URL}/order/${orderId}`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Order", id: arg.orderId },
      ],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useGetUserOrdersQuery,
} = ordersApiSlice;

export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

export const selectOrdersData = createSelector(
  selectOrdersResult,
  (ordersResult) => ordersResult.data, // normalized state object with ids & entities
);

export const {
  selectAll: selectAllOrders, // maps over ids array, and returns sorted array of entities
  selectById: selectOrderById, // needs state and entity ID , returns entity with that ID useSelector(state => selectOrderById(state, id))
  selectEntities: selectOrderEntities, // returns entities lookup table
  selectIds: selectOrderIds, // selects array of ids
  selectTotal: selectTotalOrders, // returns total num of entities stored in state

  // Pass in a selector that returns the orders slice of state
} = ordersAdapter.getSelectors(
  (state) => selectOrdersData(state) ?? initialState,
);

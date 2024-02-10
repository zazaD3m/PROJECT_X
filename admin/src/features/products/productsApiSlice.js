// /* eslint-disable no-unused-vars */
// import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import { apiSlice } from "../api/apiSlice";

// import { PRODUCTS_URL } from "../../lib/constants";

// const productsAdapter = createEntityAdapter({
//   selectId: (product) => product._id,
//   sortComparer: (a, b) => a.productName.localeCompare(b.productName),
// });

// const initialState = productsAdapter.getInitialState();

// const productsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: () => `${PRODUCTS_URL}`,
//       transformResponse: (responseData) => {
//         return productsAdapter.setAll(initialState, responseData);
//       },
//       providesTags: (result, error, arg) =>
//         result
//           ? [
//               { type: "Product", id: "LIST" },
//               ...result.ids.map((id) => ({ type: "Product", id })),
//             ]
//           : [{ type: "Product", id: "LIST" }],
//     }),
//     getProductById: builder.query({
//       query: (productId) => `${PRODUCTS_URL}/product/${productId}`,
//     }),
//     createProduct: builder.mutation({
//       query: ({ productName }) => ({
//         url: `${PRODUCTS_URL}`,
//         method: "POST",
//         body: { productName },
//       }),
//       invalidatesTags: [{ type: "Product", id: "LIST" }],
//     }),
//     updateProduct: builder.mutation({
//       query: ({ productId, productName }) => ({
//         url: `${PRODUCTS_URL}/product/${productId}`,
//         method: "PUT",
//         body: { productName },
//       }),
//       async onQueryStarted(
//         { productId, productName },
//         { dispatch, queryFulfilled },
//       ) {
//         const putResult = dispatch(
//           productsApiSlice.util.updateQueryData(
//             "getProductById",
//             productId,
//             (draft) => {
//               draft.productName = productName;
//             },
//           ),
//         );
//         try {
//           await queryFulfilled;
//         } catch (err) {
//           putResult.undo();
//         }
//       },
//       invalidatesTags: (result, error, arg) => [
//         { type: "Product", id: arg.productId },
//       ],
//     }),
//     deleteProduct: builder.mutation({
//       query: ({ productId }) => ({
//         url: `${PRODUCTS_URL}/product/${productId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, arg) => [
//         { type: "Product", id: arg.productId },
//       ],
//     }),
//   }),
// });

// export const {
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useDeleteProductMutation,
// } = productsApiSlice;

// export const selectProductsResult =
//   productsApiSlice.endpoints.getProducts.select("getProducts");

// export const selectProductsData = createSelector(
//   selectProductsResult,
//   (productsResult) => productsResult.data, // normalized state object with ids & entities
// );

// export const {
//   selectAll: selectAllProducts, // maps over ids array, and returns sorted array of entities
//   selectById: selectProductById, // needs state and entity ID , returns entity with that ID
//   selectEntities: selectProductEntities, // returns entities lookup table
//   selectIds: selectProductIds, // selects array of ids
//   selectTotal: selectTotalProducts, // returns total num of entities stored in state

//   // Pass in a selector that returns the products slice of state
// } = productsAdapter.getSelectors(
//   (state) => selectProductsData(state) ?? initialState,
// );

import { apiSlice } from "../api/apiSlice";

import { PRODUCT_IMAGES_URL } from "../../lib/constants";

const imagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (image) => ({
        url: `${PRODUCT_IMAGES_URL}`,
        method: "POST",
        body: image,
        formData: true,
      }),
    }),
    deleteImage: builder.mutation({
      query: (public_id) => ({
        url: `${PRODUCT_IMAGES_URL}`,
        method: "DELETE",
        body: { public_id: public_id },
      }),
    }),
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } =
  imagesApiSlice;

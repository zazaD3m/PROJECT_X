/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    siteInfo: { theme: "system" },
  },
  reducers: {
    setUser: (state, action) => {
      const { userInfo } = action.payload;
      state.userInfo = userInfo;
    },
    clearUser: (state, action) => {
      state.userInfo = null;
    },
    setTheme: (state, action) => {
      const theme = action.payload;
      state.siteInfo.theme = theme;
    },
    updateWishlist: (state, action) => {
      const { product, method } = action.payload;
      // const currentWishlist = [...action.userInfo.wishlist]
      if (method === "add") {
        if (state.userInfo.wishlist.every((w) => w._id !== product._id)) {
          state.userInfo.wishlist = [...state.userInfo.wishlist, product];
        }
      }
      if (method === "remove") {
        state.userInfo.wishlist = state.userInfo.wishlist.filter(
          (p) => p._id !== product._id,
        );
      }
    },
  },
});

export const { setUser, clearUser, setTheme, updateWishlist } =
  userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.userInfo;
export const selectWishlist = (state) => state.user.userInfo.wishlist;
export const selectSiteInfo = (state) => state.user.siteInfo;

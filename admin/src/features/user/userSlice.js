/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    siteInfo: { theme: "system", sidebarIsOpen: false },
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
    toggleSidebar: (state, action) => {
      state.siteInfo.sidebarIsOpen = !state.siteInfo.sidebarIsOpen;
    },
  },
});

export const { setUser, clearUser, setTheme, toggleSidebar } =
  userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.userInfo;
export const selectSiteInfo = (state) => state.user.siteInfo;

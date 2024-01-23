import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import { apiSlice } from "../features/api/apiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;

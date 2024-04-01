import { REHYDRATE } from "redux-persist/lib/constants";

export const rehydrateState = () => {
  const persistedState = localStorage.getItem("persist:root");
  const parsedState = persistedState ? JSON.parse(persistedState) : {};

  return {
    type: REHYDRATE,
    payload: {
      auth: parsedState.auth ? JSON.parse(parsedState.auth) : {},
      user: parsedState.user ? JSON.parse(parsedState.user) : {},
      _persist: parsedState._persist ? JSON.parse(parsedState._persist) : {},
    },
    key: "root",
  };
};

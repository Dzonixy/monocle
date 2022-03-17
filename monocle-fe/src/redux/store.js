// Utils
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

// Constants
import { AUTH } from "constants/index";

// Service
import { postsApi } from "service/posts";
import { usersApi } from "service/users";

// Reducers
import authReducer from "./reducers/authReducer";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postsApi.middleware)
      .concat(usersApi.middleware),
});

store.subscribe(() => {
  localStorage.setItem(AUTH, JSON.stringify(store.getState().auth));
});

setupListeners(store.dispatch);

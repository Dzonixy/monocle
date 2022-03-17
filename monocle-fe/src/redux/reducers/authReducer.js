// Utils
import { createSlice } from "@reduxjs/toolkit";

// Constants
import { AUTH } from "constants/index";

const authFromLocalStorage = JSON.parse(localStorage.getItem(AUTH));

const slice = createSlice({
  name: AUTH,
  initialState: authFromLocalStorage || {
    username: "",
    role: "",
    profileImage: "",
    isAuthenticated: false,
    id: "",
    handle: "",
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { id, username, role, profileImage, isAuthenticated, handle } }
    ) => {
      state.username = username;
      state.role = role;
      state.profileImage = profileImage;
      state.isAuthenticated = isAuthenticated;
      state.id = id;
      state.handle = handle;
    },
  },
});

export const { setCredentials } = slice.actions;

export const selectUsername = ({ auth }) => auth.username;

export const selectAuthentication = ({ auth }) => auth.isAuthenticated;

export const selectUserRole = ({ auth }) => auth.role;

export const selectUser = ({ auth: user }) => user;

export default slice.reducer;

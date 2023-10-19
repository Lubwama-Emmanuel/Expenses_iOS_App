import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },

  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = "";
    },
  },
});

export const { addToken, logOut } = authSlice.actions;
export default authSlice.reducer;

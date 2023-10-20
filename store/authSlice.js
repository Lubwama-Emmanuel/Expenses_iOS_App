import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

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
      AsyncStorage.removeItem("token");
    },
  },
});

export const { addToken, logOut } = authSlice.actions;
export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
});

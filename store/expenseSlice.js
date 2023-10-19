import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;

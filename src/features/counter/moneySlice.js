import { createSlice } from "@reduxjs/toolkit";

const initialState = { money: 100, error: 0 };

export const counterSlice = createSlice({
  name: "money",
  initialState,
  reducers: {
    pay: (state, action) => {
      state.error = 0;
      if (state.money - action.payload < 0) {
        state.error = 1;
      } else {
        state.money = state.money - action.payload;
        state.error = state.error = -1;
      }
    },
  },
});

export const { pay } = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { menu } from "./menu";

const initialState = menu;

export const counterSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    order: (state, action) => {
      if (state[action.payload[0]].quantity - action.payload[1] < 0) {
        return;
      }
      state[action.payload[0]].quantity -= action.payload[1];
    },
    removeFromOrder: (state, action) => {
      if (state[action.payload[0]].quantity + action.payload[1] > initialState[action.payload[0]].quantity) {
        return;
      }
      state[action.payload[0]].quantity += action.payload[1];
    },
  },
});

export const { order, removeFromOrder } = counterSlice.actions;

export default counterSlice.reducer;

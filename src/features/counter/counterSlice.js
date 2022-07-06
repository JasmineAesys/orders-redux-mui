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
      state[action.payload[0]].ordered += action.payload[1];
    },
    removeFromOrder: (state, action) => {
      if (state[action.payload[0]].quantity + action.payload[1] > initialState[action.payload[0]].quantity) {
        return;
      }
      state[action.payload[0]].quantity += action.payload[1];
      state[action.payload[0]].ordered -= action.payload[1];
    },
    resetCart: (state, action) => {
      state = state.map((food) => {
        return (food.ordered = 0);
      });
    },
  },
});

export const { order, removeFromOrder, resetCart } = counterSlice.actions;

export default counterSlice.reducer;

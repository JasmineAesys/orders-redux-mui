import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const counterSlice = createSlice({
  name: "successfullOrders",
  initialState,
  reducers: {
    newOrder: (state, action) => {
      state.push({
        date: action.payload[2],
        totalOrder: action.payload[0],
        itemList: action.payload[1].map((item) => {
          return {
            quantity: item.ordered,
            name: item.name,
            price: item.price,
          };
        }),
      });
    },
  },
});

export const { newOrder } = counterSlice.actions;

export default counterSlice.reducer;

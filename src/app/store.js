import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import moneyReducer from "../features/counter/moneySlice";

export const store = configureStore({
  reducer: {
    orders: counterReducer,
    money: moneyReducer,
  },
});

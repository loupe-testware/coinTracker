import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "./coinSlice";
import customerReducer from "./customerSlice";

export default configureStore({
  reducer: {
    coins: coinsReducer,
    customerDetails: customerReducer
  },
});

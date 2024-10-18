import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./cart-slice";
import uiSlice from "./ui-sclice";
import cartSlice from "./cart-slice";
const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        cart: cartSlice.reducer
    }
})


export default store;
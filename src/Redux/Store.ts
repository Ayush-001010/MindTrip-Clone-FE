import { configureStore } from "@reduxjs/toolkit";
import UserDetailsReducer from "./Slices/UserDetails/UserDetails";

const Store = configureStore({
    reducer: {
        userDetails : UserDetailsReducer
    },
});

export default Store;
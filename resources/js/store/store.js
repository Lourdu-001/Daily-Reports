// src/store/store.js

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import apiSliceReducer from "./apiSlice"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        users: apiSliceReducer
    }
});

// src/store/todoSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers =
    createAsyncThunk(

        "users/fetchUsers",

        async () => {

            const response =
                await axios.get(
                    "https://jsonplaceholder.typicode.com/users"
                );

            return response.data;

        }

    );

const todoSlice = createSlice({

    name: "todos",

    initialState: {
        todos: []
    },

    reducers: {

        addTodo: (state, action) => {

            state.todos.push(action.payload);

        },

        removeTodo: (state, action) => {

            state.todos = state.todos.filter(
                todo => todo.id !== action.payload
            );

        },

        toggleTodo: (state, action) => {

            const todo = state.todos.find(
                todo => todo.id === action.payload
            );
        }

    },

    extraReducers : (builder) => {
        builder.addCase(
            fetchUsers.pending, 
            (state) => {
                state.loading = true;
            }
        )
        .addCase(
            fetchUsers.fulfilled,
            (state, action) => {
                state.loading=false;
                state.users = action.payload;
            }
        )
        .addCase(
            fetchUsers.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }
        )
    }
});

export const {
    addTodo,
    removeTodo,
    toggleTodo
} = todoSlice.actions;

export default todoSlice.reducer;
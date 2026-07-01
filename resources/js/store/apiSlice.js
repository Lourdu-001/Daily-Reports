import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(response.data);
    return response.data;
});

const apiSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false; // Fixed: turn off loading!
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    }
});

export default apiSlice.reducer;
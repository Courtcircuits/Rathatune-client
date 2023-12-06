import { createSlice } from "@reduxjs/toolkit";
import { default_auth } from "../contexts/AuthContext";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            token: localStorage.getItem('token') || default_auth.token,
            name: default_auth.name,
        },
    },
    reducers: {
        login: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.user = {
                token: action.payload.token,
                name: action.payload.name,
            }
        },
        logout: (state) => {
            localStorage.removeItem('token');
            state.user = {
                token: "",
                name: "",
            };
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer
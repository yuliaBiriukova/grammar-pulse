import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {loginUserAsync} from "./authApi";

const initialState = {
    isAuthorized: !!localStorage.getItem('accessToken'),
}

export const login = createAsyncThunk(
    'auth/loginUser',
    async (accessToken: string)=> {
        localStorage.setItem('accessToken', accessToken);
        const userRole = await loginUserAsync();
        localStorage.setItem('userRole', userRole);
        return;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthorized = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userRole');
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isAuthorized = true;
        });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
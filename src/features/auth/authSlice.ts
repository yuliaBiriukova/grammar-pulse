import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";

const initialState = {
    isAuthorized: !!localStorage.getItem('userToken'),
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthorized = true;
        },
        logout: (state) => {
            state.isAuthorized = false;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
import type { User } from '@/features/auth/hooks/authApi';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    checkedAuth: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    checkedAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
            state.checkedAuth = true;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setCheckedAuth: (state, action: PayloadAction<boolean>) => {
            state.checkedAuth = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.checkedAuth = true;
        },
    },
});

export const { setUser, setLoading, setCheckedAuth, logout } = authSlice.actions;
export default authSlice.reducer;

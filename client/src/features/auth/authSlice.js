import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
			state.isAuthenticated = true;
		},
		clearAccessToken: (state) => {
			state.accessToken = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
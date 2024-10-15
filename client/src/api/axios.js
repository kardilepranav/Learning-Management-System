import axios from 'axios';
import { setAccessToken, clearAccessToken } from '../features/auth/authSlice';
import store from '../Store/store';

const api = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const { accessToken } = store.getState().auth;
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				const response = await api.post('/token/refresh-token');
				store.dispatch(setAccessToken(response.data.accessToken));
				originalRequest.headers[
					'Authorization'
				] = `Bearer ${response.data.accessToken}`;
				return api(originalRequest);
			} catch (error) {
				store.dispatch(clearAccessToken());
        window.location.href = '/signin';
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	}
);

export default api;
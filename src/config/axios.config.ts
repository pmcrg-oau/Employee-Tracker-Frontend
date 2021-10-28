import Axios from 'axios';
import { baseUrl } from './config.json';

const axios = Axios.create({
	baseURL: baseUrl,
});

axios.interceptors.request.use(
	(config) => {
		config.url = config.url?.replace(/[^\x20-\x7E]/g, '');
		const noToken = ['/auth/login', '/auth/register'];

		if (!noToken.some((u) => config.url?.includes(u))) {
			const loggedInUser = JSON.parse(
				localStorage.getItem('loggedInUser') || '{}'
			);
			const token = loggedInUser.token ?? '';
			config.headers!['Authorization'] = `Bearer ${token}`;
		}

		config.headers!['Content-Type'] = 'application/json';

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(undefined, (err) => {
	if (
		err.response.status === 401 ||
		err.response.data.message === '401 Unauthorized'
	) {
		localStorage.setItem('loggedInUser', JSON.stringify({}));
		window.location.reload();
	}
	return Promise.reject(err);
});

export default axios;

import axios from 'axios';
import Vue from 'vue';
import router from '../router'

const baseURL = '/api';

const instance = axios.create({
	baseURL,
	timeout: 60000,
});

instance.interceptors.request.use(config => {
	if (localStorage.token) {
		config.headers.Authorization = 'Bearer ' + window.localStorage.token
	}
	return config
})

instance.interceptors.response.use(res => {
	return res
}, err => {
	if (err.response.status === 401) {
		router.push('/login')
	}
	return Promise.reject(err)
})

const handleError = err => {
	err.response.data.message && Vue.prototype.$message({
		type: 'error',
		message: err.response.data.message
	})
	
	return Promise.reject(err);
};

export const get = (url, config) => {
	return instance.get(url, config).then(res => {
		return res.data;
	}).catch(err => {
		handleError(err);
	});
};

export const post = (url, data, config) => {
	return instance.post(url, data).then(res => {
		return res.data;
	}).catch(err => handleError(err));
};

export const put = (url, data, config) => {
	return instance.put(url, data, config).then(res => {
		return res.data;
	}).catch(err => handleError(err));
};

export const deleteMethod = (url, config) => {
	return instance.delete(url, config).then(res => {
		return res.data;
	}).catch(err => handleError(err));
};

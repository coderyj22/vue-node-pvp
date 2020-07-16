import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const heroCreate = params => {
	return post('/hero', qs.stringify(params));
};

export const heroGet = params => {
	return get('/hero?' + qs.stringify(params));
};

export const heroEdit = params => {
	return put('/hero?' + qs.stringify(params));
};

export const heroDelete = params => {
	return deleteMethod('/hero/' + params)
}



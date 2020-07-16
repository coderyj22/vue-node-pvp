import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const itemsCreate = params => {
	return post('/items', qs.stringify(params));
};

export const itemsGet = params => {
	return get('/items?' + qs.stringify(params));
};

export const itemsEdit = params => {
	return put('/items?' + qs.stringify(params));
};

export const itemsDelete = params => {
	return deleteMethod('/items/' + params)
}



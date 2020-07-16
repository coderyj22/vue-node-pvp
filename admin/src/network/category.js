import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const categoryCreate = params => {
	return post('/categories', qs.stringify(params));
};

export const categoryGet = params => {
	return get('/categories?' + qs.stringify(params));
};

export const categoryEdit = params => {
	return put('/categories?' + qs.stringify(params));
};

export const categoryDelete = params => {
	return deleteMethod('/categories/' + params)
}



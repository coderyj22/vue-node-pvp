import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const articleCreate = params => {
	return post('/articles', qs.stringify(params));
};

export const articleGet = params => {
	return get('/articles?' + qs.stringify(params));
};

export const articleEdit = params => {
	return put('/articles', qs.stringify(params));
};

export const articleDelete = params => {
	return deleteMethod('/articles/' + params)
}




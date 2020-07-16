import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const adminUserCreate = params => {
	return post('/adminUser', qs.stringify(params));
};

export const adminUserGet = params => {
	return get('/adminUser?' + qs.stringify(params));
};

export const adminUserEdit = params => {
	return put('/adminUser?' + qs.stringify(params));
};

export const adminUserDelete = params => {
	return deleteMethod('/adminUser/' + params)
}



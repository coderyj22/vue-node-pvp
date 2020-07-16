import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const adCreate = params => {
	return post('/ad', qs.stringify(params));
};

export const adGet = params => {
	return get('/ad?' + qs.stringify(params));
};

export const adEdit = params => {
	return put('/ad?' + qs.stringify(params));
};

export const adDelete = params => {
	return deleteMethod('/ad/' + params)
}




import { get, put, post, deleteMethod } from './http';
import qs from 'qs';

export const login = params => {
	return post('http://localhost:3000/admin/api/login', qs.stringify(params))
}

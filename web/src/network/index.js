import axios from 'axios'

const baseURL = "/api"
const instance = axios.create({
	baseURL,
	timeout: 10000
})

export const getNewsList = () => {
	return instance.get('/news/list')
}

export const getHeroList = () => {
	return instance.get('/heroes/list')
}

export const getArticleDetail = (params) => {
	// return instance.get(`/news/`+qs.stringify(params))
	return instance.get(`/news/${params}`)
}

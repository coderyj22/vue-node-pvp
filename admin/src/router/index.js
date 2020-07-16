import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../views/Main.vue';
import Login from '../views/Login'
import Index from "../views/Index";

import CategoryEdit from '../views/Platform/CategoryEdit';
import CategoryList from '../views/Platform/CategoryList';

import ItemsEdit from '../views/Platform/ItemsEdit';
import ItemsList from '../views/Platform/ItemsList';

import HeroEdit from "../views/Platform/HeroEdit";
import HeroList from "../views/Platform/HeroList";

import ArticleEdit from "../views/Platform/ArticleEdit";
import ArticleList from "../views/Platform/ArticleList";

import AdEdit from "../views/Platform/AdEdit";
import AdList from "../views/Platform/AdList";

import AdminUserEdit from "../views/Platform/AdminUserEdit";
import AdminUserList from "../views/Platform/AdminUserList";

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main,
		children: [
			{
				path: '/',
				component: Index
			},
			{
				path: '/categories/create',
				component: CategoryEdit,
			},
			{
				path: '/categories/list',
				component: CategoryList,
			},
			{
				path: '/categories/edit/:id',
				component: CategoryEdit,
				props: true,
			},
			{
				path: '/items/create',
				component: ItemsEdit,
			},
			{
				path: '/items/list',
				component: ItemsList,
			},
			{
				path: '/items/edit/:id',
				component: ItemsEdit,
				props: true,
			},
			{
				path: '/heroes/create',
				component: HeroEdit,
			},
			{
				path: '/heroes/list',
				component: HeroList,
			},
			{
				path: '/heroes/edit/:id',
				component: HeroEdit,
				props: true,
			},
			{
				path: '/articles/create',
				component: ArticleEdit,
			},
			{
				path: '/articles/list',
				component: ArticleList,
			},
			{
				path: '/articles/edit/:id',
				component: ArticleEdit,
				props: true,
			},
			{
				path: '/ads/create',
				component: AdEdit,
			},
			{
				path: '/ads/list',
				component: AdList,
			},
			{
				path: '/ads/edit/:id',
				component: AdEdit,
				props: true,
			},
			{
				path: '/admin_users/create',
				component: AdminUserEdit,
			},
			{
				path: '/admin_users/list',
				component: AdminUserList,
			},
			{
				path: '/admin_users/edit/:id',
				component: AdminUserEdit,
				props: true,
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			isPublic: true
		}
	}
];

const router = new VueRouter({
	routes,
});

router.beforeEach((to, from, next) => {
	const token = window.localStorage.token
	
	if (token || to.meta.isPublic) {
		return next()
	}
	return next('/login')
})

export default router;

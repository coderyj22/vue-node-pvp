<template>
	<div>
		<h1>{{ id ? '编辑' : '新建' }}管理员</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			
			<el-form-item label="昵称">
				<el-input v-model="model.nickname"></el-input>
			</el-form-item>
			
			<el-form-item label="用户名">
				<el-input v-model="model.username"/>
			</el-form-item>
			
			<el-form-item label="密码" v-if='!id'>
				<el-input v-model="model.password"></el-input>
			</el-form-item>
			
			<el-form-item>
				<el-button native-type="submit" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { adminUserCreate, adminUserGet, adminUserEdit } from '../../network/adminUser';
	
	export default {
		props: {
			id: String,
		},
		data() {
			return {
				model: {
					username: '',
					password: '',
					nickname: ''
				},
			};
		},
		methods: {
			async save() {
				const model = this.model;
				if (this.id) {
					adminUserEdit({...model}).then(res => {
						console.log(res);
						this.$router.push('/admin_users/list')
					});
				} else {
					adminUserCreate({...model}).then(res => {
						this.$router.push('/admin_users/list');
					});
				}
			},
			_adminUserGet() {
				const id = this.id;
				adminUserGet({id}).then(res => {
					console.log(res);
					this.model = res;
				});
			},
		},
		created() {
			if (this.id) {
				this._adminUserGet()
			}
		},
	};
</script>

<style></style>

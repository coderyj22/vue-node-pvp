<template>
	<div class="login-container">
		<el-card header="请先登录" class="login-card">
			<el-form @submit.prevent.native="login">
				<el-form-item label="用户名">
					<el-input v-model="model.username"></el-input>
				</el-form-item>
				
				<el-form-item label="密码">
					<el-input v-model="model.password" type="password"></el-input>
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" native-type="submit">登陆</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { login } from "../network/login";
	
	export default {
		name: 'Login',
		components: {},
		data() {
			return {
				model: {
					username: "",
					password: ""
				}
			}
		},
		methods: {
			login() {
				const model = this.model
				login({...model}).then(res => {
					console.log(res);
					window.localStorage.token = res.token
					this.$router.push('/')
					this.$message({
						type: 'success',
						message: '登陆成功'
					})
				})
			}
		}
	}
</script>

<style>
	.login-card {
		width: 30rem;
		margin: 10rem auto;
	}
</style>

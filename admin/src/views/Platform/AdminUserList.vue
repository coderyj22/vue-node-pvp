<template>
	<div>
		<h1>管理员列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID" width="230"></el-table-column>
			<el-table-column prop="username" label="用户名"></el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button
							@click="$router.push(`/admin_users/edit/${scope.row._id}`)"
							type="primary"
							size="small"
					>编辑
					</el-button>
					<el-button @click="remove(scope.row)" size="small" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { adminUserGet, adminUserDelete } from '../../network/adminUser';
	
	export default {
		data() {
			return {
				items: [],
			};
		},
		created() {
			this._adminUserGet()
		},
		methods: {
			remove(data) {
				this.$confirm('此操作将永久删除，是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: "warning"
				}).then(() => {
					adminUserDelete(data._id).then(res => {
						console.log(res);
						if (res.success) {
							this.$message({
								message: "删除成功",
								type: 'success'
							})
							this._adminUserGet()
						}
					})
				}).catch(() => {
				
				})
			},
			_adminUserGet() {
				adminUserGet().then(res => {
					console.log(res);
					this.items = res;
				});
			}
		},
	};
</script>

<style></style>

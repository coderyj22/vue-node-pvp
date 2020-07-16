<template>
	<div>
		<h1>分类列表</h1>
		<el-table :data="hero">
			<el-table-column prop="_id" label="ID" width="230"></el-table-column>
			<el-table-column prop="name" label="英雄名称"></el-table-column>
			<el-table-column prop="title" label="称号"></el-table-column>
			<el-table-column prop="icon" label="英雄头像">
				<template slot-scope="scope">
					<img style="width:50px" :src="scope.row.avatar" alt="">
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button
							@click="$router.push(`/heroes/edit/${scope.row._id}`)"
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
	import { heroGet, heroDelete } from '../../network/hero';
	
	export default {
		data() {
			return {
				hero: [],
			};
		},
		created() {
			this._heroGet()
		},
		methods: {
			remove(data) {
				this.$confirm('此操作将永久删除，是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: "warning"
				}).then(() => {
					heroDelete(data._id).then(res => {
						console.log(res);
						if (res.success) {
							this.$message({
								message: "删除成功",
								type: 'success'
							})
							this._heroGet()
						}
					})
				}).catch(() => {
				
				})
			},
			_heroGet() {
				heroGet().then(res => {
					console.log(res);
					this.hero = res;
				});
			}
		},
	};
</script>

<style></style>

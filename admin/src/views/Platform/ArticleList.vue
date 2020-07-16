<template>
	<div>
		<h1>文章列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID" width="230"></el-table-column>
			<el-table-column prop="createDate" label="创建时间"></el-table-column>
			<el-table-column prop="title" label="文章名称"></el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button
							@click="$router.push(`/articles/edit/${scope.row._id}`)"
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
	import { articleGet, articleDelete } from '../../network/article';
	import moment from 'moment'
	
	export default {
		data() {
			return {
				items: [],
				num: 1
			};
		},
		created() {
			this._articleGet()
			window.moment = moment
		},
		methods: {
			remove(data) {
				this.$confirm('此操作将永久删除，是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: "warning"
				}).then(() => {
					articleDelete(data._id).then(res => {
						console.log(res);
						if (res.success) {
							this.$message({
								message: "删除成功",
								type: 'success'
							})
							this._articleGet()
						}
					})
				}).catch(() => {
				
				})
			},
			_articleGet() {
				articleGet().then(res => {
					console.log(res);
					this.items = res.map(item => {
						return Object.assign({}, item, {createDate: moment(Number(item.createDate)).format('YYYY-MM-DD HH:mm:SS')})
					})
					console.log(this.items)
				});
			}
		}
	};
</script>

<style></style>

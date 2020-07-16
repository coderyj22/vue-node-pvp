<template>
	<div>
		<h1>分类列表</h1>
		<el-table :data="items">
			<el-table-column prop="_id" label="ID" width="230"></el-table-column>
			<el-table-column prop="name" label="物品名称"></el-table-column>
			<el-table-column prop="icon" label="图标">
				<template slot-scope="scope">
					<img style="width:50px" :src="scope.row.icon" alt="">
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template slot-scope="scope">
					<el-button
							@click="$router.push(`/items/edit/${scope.row._id}`)"
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
	import { itemsGet, itemsDelete } from '../../network/items';
	
	export default {
		data() {
			return {
				items: [],
			};
		},
		created() {
			this._itemsGet()
		},
		methods: {
			remove(data) {
				this.$confirm('此操作将永久删除，是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: "warning"
				}).then(() => {
					itemsDelete(data._id).then(res => {
						console.log(res);
						if (res.success) {
							this.$message({
								message: "删除成功",
								type: 'success'
							})
							this._itemsGet()
						}
					})
				}).catch(() => {
				
				})
			},
			_itemsGet() {
				itemsGet().then(res => {
					console.log(res);
					this.items = res;
				});
			}
		},
	};
</script>

<style></style>

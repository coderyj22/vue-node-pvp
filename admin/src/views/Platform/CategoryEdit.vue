<template>
	<div>
		<h1>{{ id ? '编辑分类' : '新建分类' }}</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
   
			<el-form-item label="上级分类">
				<el-select v-model="model.parent">
					<el-option v-for="item in parentOptions" :key="item.id" :label="item.name" :value="item._id">
					</el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="名称">
				<el-input v-model="model.name"/>
			</el-form-item>
			
			<el-form-item>
				<el-button native-type="submit" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { categoryCreate, categoryGet, categoryEdit } from '../../network/category';
	
	export default {
		props: {
			id: String,
		},
		data() {
			return {
				model: {
					name: '',
					parent: ''
				},
				parentOptions: []
			};
		},
		methods: {
			async save() {
				const name = this.model.name;
				const parent = this.model.parent
				if (name.trim() === '') return this.$message.info('请输入有效参数');
				if (this.id) {
					const model = this.model;
					categoryEdit({...model}).then(res => {
						console.log(res);
						this.$router.push('/categories/list')
					});
				} else {
					categoryCreate({name, parent}).then(res => {
						this.$router.push('/categories/list');
					});
				}
			},
			_categoryGet() {
				const id = this.id;
				categoryGet({id}).then(res => {
					console.log(res);
					this.model = res;
				});
			},
			_getParents() {
				categoryGet().then(res => {
					console.log(res);
					this.parentOptions = res
				})
			}
		},
		created() {
			if (this.id) {
				this._categoryGet()
			}
			this._getParents()
		},
	};
</script>

<style></style>

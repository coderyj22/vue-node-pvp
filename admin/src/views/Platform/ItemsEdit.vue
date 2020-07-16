<template>
	<div>
		<h1>{{ id ? '编辑物品' : '新建物品' }}</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			
			<el-form-item label="名称">
				<el-input v-model="model.name"/>
			</el-form-item>
			
			<el-form-item label="图标">
				<el-upload
						class="avatar-uploader"
						action="http://localhost:3000/admin/api/upload"
						:show-file-list="false"
						:on-success="handleAvatarSuccess">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			
			<el-form-item>
				<el-button native-type="submit" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { itemsCreate, itemsGet, itemsEdit } from '../../network/items';
	
	export default {
		props: {
			id: String,
		},
		data() {
			return {
				model: {
					name: '',
					icon: ''
				},
				imageUrl: ''
			};
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = file.response.url
				this.model.icon = this.imageUrl
			},
			async save() {
				if (this.model.name.trim() === '') return this.$message.info('请输入有效参数');
				const model = this.model;
				if (this.id) {
					itemsEdit({...model}).then(res => {
						console.log(res);
						this.$router.push('/items/list')
					});
				} else {
					itemsCreate({...model}).then(res => {
						console.log(res);
						this.$router.push('/items/list');
					});
				}
			},
			_itemsGet() {
				const id = this.id;
				itemsGet({id}).then(res => {
					console.log(res);
					this.model = res;
				});
			},
		},
		created() {
			if (this.id) {
				this._itemsGet()
			}
		},
	};
</script>

<style>
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>

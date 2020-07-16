<template>
	<div>
		<h1>{{ id ? '编辑' : '新建' }}文章</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			
			<el-form-item label="所属分类">
				<el-select v-model="model.categories" multiple>
					<el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item._id">
					</el-option>
				</el-select>
			</el-form-item>
			
			<el-form-item label="标题">
				<el-input v-model="model.title"/>
			</el-form-item>
			
			<el-form-item label="内容">
				<vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
			</el-form-item>
			
			<el-form-item>
				<el-button native-type="submit" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { articleCreate, articleGet, articleEdit } from '../../network/article';
	import { categoryGet } from "../../network/category";
	import { VueEditor } from "vue2-editor";
	import axios from 'axios'
	export default {
		components:{
			VueEditor
		},
		props: {
			id: String,
		},
		data() {
			return {
				model: {
					title: '',
				},
				categories: []
			};
		},
		methods: {
			async save() {
				const title = this.model.title;
				const model = this.model;
				if (title.trim() === '') return this.$message.info('请输入有效参数');
				if (this.id) {
					
					articleEdit({...model}).then(res => {
						console.log(res);
						this.$router.push('/articles/list')
					});
				} else {
					articleCreate({...model}).then(res => {
						this.$router.push('/articles/list');
					});
				}
			},
			_categoryGet() {
				categoryGet().then(res => {
					this.categories = res
				});
			},
			_articleGet() {
				const id = this.id
				articleGet({id}).then(res => {
					console.log(res);
					this.model = res
				})
			},
			async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
				// An example of using FormData
				// NOTE: Your key could be different such as:
				// formData.append('file', file)
				
				var formData = new FormData();
				formData.append("file", file);
				
				axios({
					url: "http://localhost:3000/admin/api/upload",
					method: "POST",
					data: formData
				})
					.then(result => {
						let url = result.data.url; // Get url from response
						Editor.insertEmbed(cursorLocation, "image", url);
						resetUploader();
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		created() {
			if (this.id) {
				this._articleGet()
			}
			this._categoryGet()
		},
	};
</script>

<style></style>

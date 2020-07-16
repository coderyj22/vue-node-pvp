<template>
	<div>
		<h1>{{ id ? '编辑' : '新建' }}广告位</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			
			<el-form-item label="名称">
				<el-input v-model="model.name"/>
			</el-form-item>
			
			<el-form-item label="广告">
				<el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
			</el-form-item>
			<el-form-item>
				<el-row type="flex" style="flex-wrap:wrap">
					<el-col :md="24" v-for="(item,index) in model.items" :key="index">
						<el-form-item label="跳转链接">
							<el-input v-model="item.url"></el-input>
						</el-form-item>
						<el-form-item label="焦点图" style="margin-top:30px;">
							<el-upload
									class="avatar-uploader"
									action="http://localhost:3000/admin/api/upload"
									:show-file-list="false"
									:on-success="res => $set(item,'image',res.url)">
								<img v-if="item.image" style="min-width:250px;height:120px;" :src="item.image" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						
						<el-form-item>
							<el-button size="small"
							           type="danger"
							           @click="model.items.splice(index,1)"
							>删除该广告
							</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form-item>
			
			<el-form-item>
				<el-button native-type="submit" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { adCreate, adGet, adEdit } from '../../network/ad';
	
	export default {
		props: {
			id: String,
		},
		data() {
			return {
				model: {
					name: '',
					items: []
				},
			};
		},
		methods: {
			async save() {
				const model = this.model
				if (this.id) {
					const model = this.model;
					adEdit({...model}).then(res => {
						console.log(res);
						this.$router.push('/ads/list')
					});
				} else {
					adCreate({...model}).then(res => {
						this.$router.push('/ads/list');
					});
				}
			},
			_adGet() {
				const id = this.id;
				adGet({id}).then(res => {
					this.model = Object.assign({}, this.model, res)
				});
			},
		},
		created() {
			if (this.id) {
				this._adGet()
			}
		},
	};
</script>

<style></style>

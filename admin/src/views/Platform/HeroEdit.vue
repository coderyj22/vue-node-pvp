<template>
	<div>
		<h1>{{ id ? '编辑英雄' : '新建英雄' }}</h1>
		<el-form label-width="120px" @submit.native.prevent="save">
			
			<el-tabs type="border-card" value="skills">
				<el-tab-pane label="基础信息">
					<el-form-item label="英雄名称">
						<el-input v-model="model.name"/>
					</el-form-item>
					
					<el-form-item label="称号">
						<el-input v-model="model.title"/>
					</el-form-item>
					
					<el-form-item label="头像">
						<el-upload
								class="avatar-uploader"
								action="http://localhost:3000/admin/api/upload"
								:show-file-list="false"
								:on-success="handleAvatarSuccess">
							<img v-if="imageUrl" style="width:100px;height:100px;" :src="imageUrl" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					
					<el-form-item label="类型">
						<el-select v-model="model.categories" multiple>
							<el-option v-for="item in categories"
							           :label="item.name"
							           :value="item._id"
							           :key="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="难度">
						<el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.difficult"></el-rate>
					</el-form-item>
					
					<el-form-item label="技能">
						<el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.skill"></el-rate>
					</el-form-item>
					
					<el-form-item label="攻击">
						<el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.attack"></el-rate>
					</el-form-item>
					
					<el-form-item label="生存">
						<el-rate style="margin-top: 0.6rem" :max="10" show-score v-model="model.scores.survive"></el-rate>
					</el-form-item>
					
					<el-form-item label="顺风出装">
						<el-select v-model="model.items1" multiple>
							<el-option v-for="item in items"
							           :label="item.name"
							           :value="item._id"
							           :key="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="逆风出装">
						<el-select v-model="model.items2" multiple>
							<el-option v-for="item in items"
							           :label="item.name"
							           :value="item._id"
							           :key="item._id"></el-option>
						</el-select>
					</el-form-item>
					
					<el-form-item label="使用技巧">
						<el-input type="textarea" v-model="model.usageTips"></el-input>
					</el-form-item>
					
					<el-form-item label="对抗技巧">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>
					
					<el-form-item label="团战思路">
						<el-input type="textarea" v-model="model.teamTips"></el-input>
					</el-form-item>
				
				</el-tab-pane>
				
				<el-tab-pane label="技能" name="skills">
					
					<el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
					<el-row type="flex" style="flex-wrap:wrap">
						<el-col :md="12" v-for="(item,index) in model.skills" :key="index">
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
										class="avatar-uploader"
										action="http://localhost:3000/admin/api/upload"
										:show-file-list="false"
										:on-success="res => $set(item,'icon',res.url)">
									<img v-if="item.icon" style="width:60px;height:60px;" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="描述">
								<el-input type="textarea" v-model="item.description"></el-input>
							</el-form-item>
							
							<el-form-item>
								<el-button size="small"
								           type="danger"
								           @click="model.skills.splice(index,1)"
								>删除此项技能</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-form-item style="margin-top:1rem;">
				<el-button native-type="submit" type="primary">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { heroCreate, heroGet, heroEdit } from '../../network/hero';
	import { categoryGet } from "../../network/category";
	import { itemsGet } from "../../network/items";
	
	export default {
		props: {
			id: String,
		},
		data() {
			return {
				model: {
					name: '',
					avatar: '',
					scores: {
						difficult: 0,
						skill: 0,
						attack: 0,
						survive: 0
					}
				},
				imageUrl: '',
				categories: [],   // 英雄分类
				items: [],        //
			};
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = file.response.url
				this.model.avatar = this.imageUrl
			},
			
			async save() {
				if (this.model.name.trim() === '') return this.$message.info('请输入有效参数');
				const model = this.model;
				if (this.id) {
					heroEdit({...model}).then(res => {
						console.log(res);
						this.$router.push('/heroes/list')
					});
				} else {
					heroCreate({...model}).then(res => {
						console.log(res);
						this.$router.push('/heroes/list');
					});
				}
			},
			_heroGet() {
				const id = this.id;
				heroGet({id}).then(res => {
					console.log(res);
					this.model = Object.assign({}, this.model, res)
					this.imageUrl = this.model.avatar
				});
			},
		},
		created() {
			if (this.id) {
				this._heroGet()
			}
			categoryGet().then(res => {
				this.categories = res
			})
			itemsGet().then(res => {
				console.log(res);
				this.items = res
			})
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
	
	.el-upload .el-icon-plus {
		display: flex;
		justify-content: center;
		align-items: center;
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

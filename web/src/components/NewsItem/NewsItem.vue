<template>
	<ul class="new-container">
		<li class="news-item" @click="handleClickNewsItem(item)" v-for="(item,index) in data" :key="item._id || index">
			<div class="item-left">
				<span class="new-category" :class="cls(item)">{{item.categoryName}}</span>
				<div class="new-title">{{item.title}}</div>
			</div>
			<div class="item-right">{{item.updatedAt | formatDate}}</div>
		</li>
	</ul>
</template>

<script>
	import moment from 'moment'
	
	export default {
		name: "NewsItem",
		props: {
			data: {
				type: Array,
				default() {
					return []
				}
			}
		},
		filters: {
			formatDate(date) {
				return moment(date).format('MM/DD')
			}
		},
		methods: {
			cls(item) {
				return item.categoryName === '新闻' ? 'cls1' : item.categoryName === '公告' ? 'cls2' : item.categoryName === '活动' ? 'cls3' : item.categoryName === '赛事' ? 'cls4' : ''
			},
			handleClickNewsItem(item) {
				console.log(item._id);
				this.$router.push({
					path: `/article/${item._id}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.new-container {
		display: block;
		padding: 10px 0;
		
		.news-item {
			height: 20px;
			line-height: 20px;
			font-size: 14px;
			color: #222;
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			
			.item-left {
				width: 300px;
				display: flex;
				padding-right: 10px;
				
				.new-category {
					height: 20px;
					box-sizing: border-box;
					display: block;
					padding: 0 3px;
					color: #f09a37;
					border: 1px solid #f09a37;
					border-radius: 3px;
					font-size: 12px;
					margin-right: 5px;
					flex: 0 0 32px;
					
					&.cls1 {
						color: #1e96ab;
						border-color: #1e96ab;
					}
					
					&.cls3 {
						color: #ff3636;
						border-color: #ff3636;
					}
					
					&.cls4 {
						color: #4d9cff;
						border-color: #4d9cff;
					}
				}
				
				.new-title {
					font-size: 14px;
					color: #222;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					flex: 1;
				}
			}
			
			.item-right {
				width: 35px;
				color: #777;
				font-size: 12px;
			}
			
		}
	}

</style>

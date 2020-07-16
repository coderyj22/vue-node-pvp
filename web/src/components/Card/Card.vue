<template>
	<div class="card">
		<div class="card-title">
			<div class="title-item">
				<img v-if="imgHeader" :src="imgHeader" alt="">
				<div v-else class="img"></div>
				<h1 class="title-txt">{{headerTitle}}</h1>
			</div>
			<div class="title-item" v-if="hasMore">
				<div class="img-more"></div>
			</div>
		</div>
		<div class="card-container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Card",
		props: {
			imgHeader: String,
			headerTitle: String,
			hasMore: {
				type: Boolean,
				default: true
			},
		},
	}
</script>

<style scoped lang="scss">
	.card {
		padding: 0 20px;
		margin-top: 10px;
		background-color: #fff;
		
		.card-title {
			position: relative;
			display: flex;
			align-items: center;
			padding: 15px 0;
			justify-content: space-between;
			margin-bottom: 15px;
			
			.title-item {
				display: flex;
				
				img {
					width: 13.5px;
					height: 15px;
					margin-right: 10px;
				}
				
				.img {
					width: 13.5px;
					height: 15px;
					background: url("../../assets/img/sprite.png") no-repeat 0 -222px;
					background-size: 375px;
					margin-right: 10px;
				}
				
				.title-txt {
					color: #212222;
					font-size: 15px;
				}
				
				.img-more {
					width: 20px;
					height: 3px;
					background: url("../../assets/img/sprite.png") no-repeat -170px -254px;
					background-size: 375px;
					
					&:after {
						content: "";
						position: absolute;
						bottom: 0;
						left: 0;
						height: 1px;
						width: 100%;
						background-color: #d4d9de;
						transform: scaleY(.5);
					}
				}
			}
		}
		
		.card-container {
			box-sizing: border-box;
			
			.cont-title {
				display: flex;
				height: 22px;
				justify-content: space-between;
				
				.title-item {
					display: flex;
					
					&.active {
						color: #db9e3f;
						border-bottom: 2px solid #db9e3f;
					}
				}
			}
		}
	}
</style>

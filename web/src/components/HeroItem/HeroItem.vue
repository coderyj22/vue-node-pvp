<template>
	<ul class="hero-container">
		<li class="hero-item" v-for="item in data">
			<img :src="item.avatar" alt="">
			<div class="name">{{item.name}}</div>
		</li>
	</ul>
</template>

<script>
	export default {
		name: "HeroItem",
		props: {
			data: Array
		},
		mounted() {
			console.log(this.data)
		}
	}
</script>

<style scoped lang="scss">
	.hero-container {
		width: 350px;
		display: flex;
		padding: 0;
		flex-wrap: wrap;
		height: auto;
		justify-content: space-between;
		
		.hero-item {
			width: 58px;
			height: 87px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			img {
				width: 58px;
				height: 58px;
			}
			
			.name {
				text-align: center;
				padding-bottom:5px;
			}
		}
	}
</style>

<template>
	<div class="slide-wrapper" ref="slideWrapperRef">
		<div class="slide-content" ref="slideContentRef">
			<slot/>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		name: "Slide",
		props: {
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		mounted() {
			this._initWidth()
			this._initScroll()
		},
		methods: {
			_initWidth() {
				this.childrens = this.$refs.slideContentRef.children
				const width = this.$refs.slideWrapperRef.clientWidth
				let slideContentWidth = 0
				for (let i = 0; i < this.childrens.length; i++) {
					this.childrens[i].style.width = width + 'px'
					this.childrens[i].classList.add('slide-item')
					slideContentWidth += width
				}
				this.$refs.slideContentRef.style.width = slideContentWidth + 'px'
			},
			_initScroll() {
				this.slider = new BScroll(this.$refs.slideWrapperRef, {
					scrollY: false,
					scrollX: true,
					momentum: false,
					click: true,
					snap: {
						loop: false,
						threshold: 0.2,
						speed: 500
					}
				})
				
				this.slider.on('scrollEnd', () => {
					const index = this.slider.getCurrentPage().pageX
					this.$emit('changeIndex', index)
				})
				
			},
			
			goToPage() {
				this.slider.goToPage.apply(this.slider, arguments)
			}
		}
	}
</script>

<style scoped lang="scss">
	.slide-wrapper {
		overflow: hidden;
		height: 180px;
		
		.slide-content {
			display: flex;
		}
	}
</style>

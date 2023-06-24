<template>
	<view>
		<view v-if='cartGoodsList.length>0'>


			<!-- 显示单个商品 -->
			<view class="goods_box" v-for='g in cartGoodsList' :key='g.id'>
				<!-- 是否选中该商品 -->
				<checkbox @click='updateStatus(g)' color="#55aa7f" :checked="g.is_checked" />
				<!-- 商品信息 -->
				<view class='info'>
					<image :src="g.goods.cover" @click='toGoodsDetail(g.goods.id)'></image>
					<view class='desc'>
						<view class="name" @click='toGoodsDetail(g.goods.id)'>{{g.goods.title}}</view>
						<view class='pn'>
							<view class='price'>￥{{g.goods.price}}</view>
							<view class='number'>
								<uni-number-box :max='g.goods.stock' :value="g.number"
									@change="changeNumber($event,g)" />

							</view>
						</view>
					</view>

				</view>

			</view>
			<!-- 提交订单 -->
			<view class="submit_btn">
				<button @click='toSubmitOrder' type="default">去结算</button>
			</view>
		</view>
		<!-- 购物车商品为空 -->
		<view v-else class='cart_null'>
			<image src="../../static/tabbar_icon/icon_r/tab-cart.png" mode=""></image>
			<view>购物车没有商品哦!</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {

			}
		},
		methods: {
			...mapActions(['getCartGoodsList']),
			toGoodsDetail(goodsId) {
				const url = `/pages/goods/detail?id=${goodsId}`
				uni.navigateTo({
					url: url
				})
			},
			// 跳转到订单提交页面
			toSubmitOrder(){
				uni.navigateTo({
					url: '/pages/order/submit'
				})
			},
			// 修改商品选中状态
			async updateStatus(g) {
				// 调用后端接口，发送请求
				const response = await this.$api.cart.checkedCartGoods(g.id)
				if (response.statusCode !== 200) {
					uni.showToast({
						title: "网络异常!"
					})
					// 不修改前端显示的状态
					g.g.is_checked = !g.g.is_checked
				}
			},

			async changeNumber(val, g) {
				// 发送请求修改购物车中商品的数量
				const response = await this.$api.cart.updateGoodsNumber(g.id, {
					number: val
				})
				if (response.statusCode === 200) {
					this.getCartGoodsList()
				} else {
					// 重置商品的数量
				}

			}
		},
		computed: {
			...mapState(['cartGoodsList', 'isAuth']),
		},
		onLoad() {
			this.getCartGoodsList()
		}
	}
</script>

<style scoped lang="scss">
	// 购物车中商品的样式
	.goods_box {
		display: flex;
		align-items: center;
		height: 200upx;
		margin: 10upx;
		background: #fff;

		.info {
			flex: 1;
			display: flex;
			padding: 10upx;

			image {
				width: 180upx;
				height: 180upx;
			}

			.desc {
				flex: 1;
				padding-left: 20upx;
				position: relative;

				.name {}

				.pn {
					position: absolute;
					bottom: 5upx;
					display: flex;

					.price {
						color: #ff557f;
						padding-right: 80upx
					}

					.number {
						padding-right: 10upx;
					}
				}

			}

		}
	}

	// 提交订单的按钮
	.submit_btn {
		position: fixed;
		width: 100%;
		bottom: 110upx;
		button {
			color: #fff;
			background: #55aa7f;
			height: 74upx;
			line-height: 74upx;
			margin: 0 10upx;
		}
	}

	// 购物车商品为空
	.cart_null {
		font-size: 20px;
		color: #bfbfbf;
		height: 70vh;
		// 通过flex布局 让内容显示在屏幕中间
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 200upx;
			height: 200upx;
		}
	}
</style>

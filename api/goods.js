// 商品模块接口封装
import http from './request.js'

export default{
	// 获取商城首页的数据
	getIndexData(){
		return http.get('/api/goods/index/')
	},
	// 获取单个商品的详情
	getGoodsDetail(goodsId){
		return http.get(`/api/goods/goods/${goodsId}/`)
	},
	// 根据商品分类获取商品数据
	getGoodsList(params){
		return http.get('/api/goods/goods/',params)
	},
	// 获取收藏的商品列表
	getCollectList(){
		return http.get('/api/goods/collect/',{},true)
	},
	// 收藏商品 
	collectGoods(params){
		return http.post('/api/goods/collect/',params,true)
	},
	// 取消收藏
	delCollectGoods(id){
		return http.delete(`/api/goods/collect/${id}/`,{},true)
	}
}
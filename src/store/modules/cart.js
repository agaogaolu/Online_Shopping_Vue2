import { getCartList, changeCount, delSelect } from "@/api/cart"
import { Toast } from "vant"

export default {
    namespaced: true,
    state() {
        return {
            cartList: []
        }
    },
    mutations: {
        setCartList(state, newList) {
            state.cartList = newList
        },
        toggleCheck(state, goodsId) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.isChecked = !goods.isChecked
        },
        toggleAllCheck(state, flag) {
            state.cartList.forEach(item => {
                item.isChecked = flag
            })
        },
        changeCount(state, { goodsId, goodsNum }) {
            const goods = state.cartList.find(item => item.goods_id === goodsId)
            goods.goods_num = goodsNum
        }
    },
    actions: {
        async getCartAction(context) {
            const { data } = await getCartList()
            data.list.forEach(element => {
                element.isChecked = true
            });
            context.commit('setCartList', data.list)
        },
        async changeCountAction(context, obj) {
            const { goodsNum, goodsId, goodsSkuId } = obj

            context.commit('changeCount', { goodsId, goodsNum })
            const res = await changeCount(goodsId, goodsNum, goodsSkuId)
            console.log(res)
        },
        async delSelect(context) {
            const selCartList = context.getters.selCartList
            const cartIds = selCartList.map(item => item.id)
            await delSelect(cartIds)
            Toast('Del Success')

            context.dispatch('getCartAction')
        }
    },
    getters: {
        cartTotal(state) {
            return state.cartList.reduce(
                (sum, item, index) => sum + item.goods_num, 0)
        },
        selCartList(state) {
            return state.cartList.filter(item => item.isChecked)
        },
        selCount(state, getters) {
            return getters.selCartList.reduce(
                (sum, item, index) => sum + item.goods_num, 0)
        },
        selPrice(state, getters) {
            return getters.selCartList.reduce(
                (sum, item, index) => {
                    return sum + item.goods_num * item.goods.goods_price_min
                }, 0)
        },
        isAllChecked(state) {
            return state.cartList.every(item => item.isChecked)
        }

    }
}
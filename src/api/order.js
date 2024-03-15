import request from "@/utils/requests";

export const checkOrder = (mode, obj) => {
    return request.get('/checkout/order', {
        params: {
            delivery: 10,
            couponId: 0,
            isUsePoints: 0,
            mode,//cart,buyNow
            ...obj,//动态展开参数
        }
    })
}

export const submitOrder = (mode, obj) => {
    return request.post('/checkout/submit', {
        mode,
        delivery: 10,
        couponId: 0,
        isUsePoints: 0,
        payType: 10,
        ...obj
    })
}

export const getMyOrderList = (dataType, page) => {
    return request.get('/order/list', {
        params: {
            dataType,
            page
        }
    })
}
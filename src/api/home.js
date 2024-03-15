import request from "@/utils/requests";

export const getHomeData = () => {
    return request.get('/page/detail', {
        params: {
            pageId: 0
        }
    })
}
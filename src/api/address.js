import request from "@/utils/requests";

export const getAddressList = () => {
    return request.get('/address/list')
}
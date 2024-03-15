import request from "@/utils/requests"



// 获取个人信息
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
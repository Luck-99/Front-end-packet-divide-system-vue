import { request } from "../utils/axios"

/**
 * 登录接口
 * @param params {username:账号 password密码}
 * @returns 登录成功的token
 */
export const login = async (params: { username: string; password: string }) => {
  return request("/login", {
    method: "POST",
    data: params,
  })
}

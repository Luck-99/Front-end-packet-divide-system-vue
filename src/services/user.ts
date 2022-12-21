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

/**
 * 注销登录
 * @param params 空
 * @returns
 */
export const logout = async (params: null) => {
  return request("/logout", {
    method: "POST",
    data: params,
  })
}

/**
 * 获取成员列表
 * @param params 空
 * @returns 成员列表
 */
export const getMembers = async (params: null) => {
  return request("/getMembers", {
    method: "GET",
    params,
  })
}

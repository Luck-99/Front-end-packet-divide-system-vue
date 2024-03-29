import { request } from "../utils/axios"

/**
 * 登录接口
 * @param params {username:账号 password密码}
 * @returns 登录成功的token
 */
export const login = async (params: { username: string; password: string }) => {
  return request("/user/login", {
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
  return request("/user/logout", {
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
  return request("/user/getMembers", {
    method: "GET",
    params,
  })
}

/**
 * 获取用户信息
 * @param params 空
 * @returns 获取用户信息
 */
export const getUserInfo = async (params: null) => {
  return request("/user/getUserInfo", {
    method: "GET",
    params,
  })
}

/**
 * 更改用户密码
 * @param oldPassWord 旧密码
 * @param newPassWord 新密码
 * @returns
 */
export const changePassWord = async (params: {
  oldPassWord: string
  newPassWord: string
}) => {
  return request("/user/changePassWord", {
    method: "POST",
    data: params,
  })
}

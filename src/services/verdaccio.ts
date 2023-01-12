import { request } from "@/utils/axios"

/**
 * 获取所有包
 * @returns 所有包当前版本数据
 */
export async function getAllPackages(params: object): Promise<any> {
  return request("/verdaccio/getAllPackages", {
    method: "GET",
    params,
  })
}

/**
 * 获取包详情
 * @param name 包名
 * @returns 包详情数据
 */
export async function getPackageInfo(params: { name: string }): Promise<any> {
  return request("/verdaccio/getPackageInfo", {
    method: "GET",
    params,
  })
}

/**
 * 获取包的readme文件
 * @param name 包名
 * @param version 版本号
 * @returns readme内容
 */
export async function getPackageReadme(params: {
  name: string
  version: string
}): Promise<any> {
  return request("/verdaccio/getPackageReadme", {
    method: "GET",
    params,
  })
}

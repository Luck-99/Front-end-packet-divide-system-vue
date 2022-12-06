import { request } from "@/utils/axios"

/**
 * 获取所有项目信息
 * @param params 空
 * @returns 所有项目信息
 */
export async function getProjects(params: null): Promise<any> {
  return request("/file/getProjects", {
    method: "GET",
    params,
  })
}

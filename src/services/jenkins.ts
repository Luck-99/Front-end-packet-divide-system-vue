import { request } from "@/utils/axios"

/**
 * 获取所有任务
 * @param params:{tree} 用于筛选 例：jobs[buildable,lastBuild[timestamp,result]]
 * @returns 所有任务信息
 */
export async function getAllJobs(params: { tree: string }): Promise<any> {
  return request("/jenkins/getAllJobs", {
    method: "GET",
    params,
  })
}

/**
 * 构建任务
 * @param params:{name} 构建任务 传入任务名称
 * @returns 构建成功信息
 */
export async function buildJob(params: { name: string }): Promise<any> {
  return request("/jenkins/buildJob", {
    method: "GET",
    params,
  })
}

/**
 * 获取任务详情
 * @param params {name：任务名称，tree：用于筛选}
 * @returns 任务详情
 */
export async function getJobInfo(params: {
  name: string
  tree: string
}): Promise<any> {
  return request("/jenkins/getJobInfo", {
    method: "GET",
    params,
  })
}

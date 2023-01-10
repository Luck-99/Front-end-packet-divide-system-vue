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
 * 参数化构建任务
 * @param params:{name} 构建任务 传入任务名称 projectName:传入参数
 * @returns 构建成功信息
 */
export async function buildWithParameters(params: {
  name: string
  projectName: string
}): Promise<any> {
  return request("/jenkins/buildWithParameters", {
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

/**
 * 下载打包文件
 * @param params {jobName:项目名称，downloadTarget:下载目标文件(名)}
 * @returns 文件流
 */
export async function downloadFile(params: {
  jobName: string
  downloadTarget?: string
}): Promise<any> {
  return request("/jenkins/downloadFile", {
    method: "GET",
    params,
    responseType: "blob",
  })
}

/**
 * 用于停止正在构建的项目
 * @param id: 项目构建id
 * @param queueId: 项目构建的队列id
 * @param projectName: 项目名称
 * @returns
 */
export async function stopBuildJob(params: {
  id: string
  queueId: string
  projectName: string
}): Promise<any> {
  return request("/jenkins/stopBuildJob", {
    method: "POST",
    data: params,
  })
}

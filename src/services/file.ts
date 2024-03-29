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

/**
 * 写入项目配置信息
 * @param params depData 依赖数据 | envName 项目名称
 * @returns
 */
export async function writeEnv(params: {
  depData: object
  envName: string
}): Promise<any> {
  return request("/file/writeEnv", {
    method: "POST",
    data: params,
  })
}

/**
 * 获取项目对应依赖信息
 * @param params key 项目名
 * @returns 项目对应依赖信息
 */
export async function getEnvDeps(params: { key: string }): Promise<any> {
  return request("/file/getEnvDeps", {
    method: "GET",
    params,
  })
}

/**
 * 获取项目操作记录
 * @param envKey 环境名的key
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns 操作记录
 */
export async function getActionRecordList(params: {
  envKey: string
  startTime: number | string
  endTime: number | string
}): Promise<any> {
  return request("/file/getActionRecordList", {
    method: "POST",
    data: params,
  })
}

/**
 * 进出环境设置
 * @param envKey :string 项目的key
 * @param isLeave :boolean 是否离开
 * @returns 已经进入的成员名单
 */
export async function environmentSetting(params: {
  envKey: string
  isLeave: boolean
}): Promise<any> {
  return request("/file/environmentSetting", {
    method: "GET",
    params,
  })
}

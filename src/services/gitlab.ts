import { request } from "@/utils/axios"

/**
 * 获取版本提交记录
 * @param params packages 包名称
 * @param params maxRecords 最大记录限制
 * @returns
 */
export async function getProjectsCommits(params: {
  packages: Array<string>
}): Promise<any> {
  return request("/gitlab/getProjectsCommits", {
    method: "POST",
    data: params,
  })
}

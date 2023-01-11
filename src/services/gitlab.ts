import { request } from "@/utils/axios"

/**
 * 获取版本提交记录
 * @param params packages 包名称
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

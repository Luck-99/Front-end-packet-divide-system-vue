import { request } from "@/utils/axios"

export async function getAllJobs(params: { tree: string }): Promise<any> {
  return request("/jenkins/getAllJobs", {
    method: "GET",
    params,
  })
}

export async function buildJob(params: { name: string }): Promise<any> {
  return request("/jenkins/buildJob", {
    method: "GET",
    params,
  })
}

export async function getJobInfo(params: {
  name: string
  tree: string
}): Promise<any> {
  return request("/jenkins/getJobInfo", {
    method: "GET",
    params,
  })
}

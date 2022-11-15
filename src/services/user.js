import { request } from "../utils/axios"

export const testrequest = async (params) => {
  return request(
    "/phoenix/assets-phoenix-contract/DocumentModelService/1.0/checkWord",
    {
      method: "POST",
      data: params,
    }
  )
}

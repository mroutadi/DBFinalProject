import { AxiosInstance } from '../config'

export const getSingleEmployee = (EmployeeID) => {
  return AxiosInstance
    .get(
      `/api/employee/${EmployeeID}`
    )
}
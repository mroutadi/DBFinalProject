import { AxiosInstance } from '../config'
export const editEmployee = (userID, values) => {
  return AxiosInstance
    .put(
      `/api/employee/${userID}`,
      {
        "first_name": values.first_name,
        "last_name": values.last_name,
        "phone_number": values.phone_number,
        "username": values.username,
        "national_id": values.national_id,
        "password": values.password,
        // "Role": values.Role,
      }
    )
}
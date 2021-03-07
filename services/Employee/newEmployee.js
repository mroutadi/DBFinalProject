import { AxiosInstance } from '../config'
export const newEmployee = (values) => {
  return AxiosInstance
    .post(
      '/api/employee',
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
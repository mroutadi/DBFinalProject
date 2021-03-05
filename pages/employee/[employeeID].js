import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSingleEmployee } from '../../services/Employee/singleEmployee'

export default function Employee() {
  const router = useRouter();
  useEffect(() => {
    getSingleEmployee(router.query.employeeID).
      then(res => res.data)
      .then(data => console.log(data));
  }, [])
  return (
    <div>
      here is employee
    </div>
  )
}
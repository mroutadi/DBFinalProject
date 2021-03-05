import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSingleEmployee } from '../../services/Employee/singleEmployee'
import Layout from '../../layout'

export default function Employee() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query.employeeID);
    router.query.employeeID && getSingleEmployee(router.query.employeeID)
      .then(res => res && res.data)
      .then(data => console.log(data));
  }, [router.query.employeeID])
  return (
    <Layout>
      here is employee
    </Layout>
  )
}
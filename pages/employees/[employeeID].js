import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { getSingleEmployee } from '../../services/Employee/singleEmployee'
import Layout from '../../layout'
export const userContext = React.createContext({ user: null });

export default function Employee() {
  const router = useRouter();
  const [user, setUser] = useState(null)
  useEffect(() => {
    // console.log(router.query.employeeID);
    router.query.employeeID && getSingleEmployee(router.query.employeeID)
      .then(res => res && res.data)
      .then(data => setUser(data));
  }, [router.query.employeeID])
  return (
    <userContext.Provider value={user}>
      <Layout>
        here is employee
      </Layout>
    </userContext.Provider>
  )
}
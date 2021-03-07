import React, { useState, useEffect } from 'react'
import {me} from '../services/Authentication/me'

//High Order Component
export default function HOC(props) {
  const [my, setMy] = useState(null)
const [loading, setLoading] = useState(true)
  useEffect(async () => {
    await me()
      .then(res => res.data)
      .then(data => {
        setMy(data)
        setLoading(false)
      })
  }, [])

  return (
    !!loading ? <div className={"loaderCont pageloader"}><div className={"loader"} /></div> : <React.Fragment>
      {props.access && props.access.includes(my && my.role) ? props.children :
      "You have no access"}
    </React.Fragment>
  )
}



import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../../layout'
import HOC from '../../../../hoc'

export default function Employee() {
  return (
    <HOC access={["admin"]}>
      <Layout>
        here is contracts
        
      </Layout>
    </HOC>
  )
}
import React, { useEffect, createContext } from 'react'
import styles from '../assets/styles/layout/layout.module.scss'
import Sidebar from '../components/sidebar'

export default function Layout(props) {
  return (
    <div className={styles.Body}>
      <span className={styles.bgContainerl} />
      <div className={styles.Layout}>
        <Sidebar />
        <div className={styles.Content}>
          {props.children}
        </div>
      </div>
      <span className={styles.bgContainerr} />
    </div>
  )
}

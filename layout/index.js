import React from 'react'
import styles from '../assets/styles/layout/layout.module.scss'

export default function Layout(props) {
  return (
    <div className={styles.Layout}>
      {props.children}
    </div>
  )
}

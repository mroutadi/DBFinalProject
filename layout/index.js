import React, { useState, useEffect, createContext } from 'react'
import styles from '../assets/styles/layout/layout.module.scss'
import Sidebar from '../components/sidebar'
import { Offline, Online } from "react-detect-offline";

export default function Layout(props) {
  const [online, setOnline] = useState(true);
  return (<React.Fragment>
    <Online>
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
    </Online>
    <Offline>
      <div className={styles.offline}>
        لطفا اینترنت خود را متصل کنید!
    </div>
    </Offline>
  </React.Fragment>
  )
}

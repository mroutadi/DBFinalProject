import React from 'react'
import styles from '../../assets/styles/sidebar/sidebar.module.scss'
import Link from 'next/link'

export default function Sidebar() {
  const availableRoutes = {
    "dashboard": "داشبورد",
    "advance": "مساعده ها",
    "loans": "وام ها",
    "absence": "مرخصی ها",
    "apyslip": "فیش حقوقی",
    "timesheet": "جدول ساعات کاری",
  }
  return (
    <div className={styles.Sidebar}>
      <div className={styles.UserInfoSide}>
        <div className={styles.UserImage}>
          <img src={"user.jpg"} alt={"esma karbar"} />
        </div>
        <span className={styles.UserName}>
          محمد اوتادی
        </span>
        <span className={styles.UserLevel}>
          مدیر
        </span>
        <div className={styles.UserAccess}>
          <div className={styles.Edit}></div>
          <div className={styles.Notifications}></div>
          <div className={styles.something}></div>
        </div>
      </div>
      <div className={styles.RoutesSide}>
        {Object.keys(availableRoutes).map(
          (route) =>
            <Link href={`/${route}`} key={route}>
              <a className={`${styles.RouteItem} deActive`}>
                {availableRoutes[route]}
              </a>
            </Link>
        )}
      </div>
    </div>
  )
}

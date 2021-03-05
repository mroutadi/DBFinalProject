import React, { useEffect } from 'react'
import styles from '../../assets/styles/sidebar/sidebar.module.scss'
import Link from 'next/link'
import { me } from '../../services/Authentication/me'
import useSWR from 'swr'

export default function Sidebar() {
  const { data, error } = useSWR('Profile', me)
  useEffect(() => {
    console.log(data);
    console.log(error);
  })
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
        <span className={styles.UserInfo}>
          {data && data.data.first_name} {data && data.data.last_name}
        </span>
        <span className={`${styles.UserName} db-user`}>
          {data && data.data.username}
        </span>
        <span className={`${styles.UserLevel} db-level`}>
          مدیر
        </span>
        <div className={styles.UserAccess}>
          <div className={`${styles.Edit} db-edit`}></div>
          <div className={`${styles.Notifications} db-notif`}></div>
          <div className={`${styles.something} db-notif`}></div>
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

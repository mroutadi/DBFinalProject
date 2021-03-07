import React, { useState, useEffect, useContext } from 'react'
import styles from '../../assets/styles/sidebar/sidebar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { me } from '../../services/Authentication/me'
import { logout } from '../../services/Authentication/logout'
import useSWR from 'swr'
import routes from '../../utils/sidebarRoutes'
import {userContext} from '../../pages/employees/[employeeID]'

export default function Sidebar() {
  const { data, error } = useSWR('Profile', me);
  const [availableRoutes, setAvailableRoutes] = useState(routes.selfAdmin);
  const [adminMode, setAdminMode] = useState(false)
  const userCTX = useContext(userContext);
  const router = useRouter();
  useEffect(() => {
    if (
      data &&
      data.data.role === "admin" &&
      router.pathname.includes("employees/")) setAvailableRoutes(routes.adminUser);
    else if (data && data.data.role === "admin") setAvailableRoutes(routes.selfAdmin)
    else if (data && data.data.role === "employee") setAvailableRoutes(routes.selfUser)
  }, [])
  useEffect(() => {
    console.log(userCTX);
  }, [userCTX])
  const urlCreator = (route) => {
    if (data && (data.data.role === "admin" || data.data.role === "employee")) return `/${route}`;
    else if (
      data &&
      data.data.role === "employee" &&
      router.pathname.includes("employees")) return `${asPath}${route}`;
  }
  return (
    <userContext.Consumer>
      {value =>
        <div className={styles.SidebarContainer}>
          <div className={`${styles.Sidebar} ${!!!adminMode ? styles.CollapsedAdmin : styles.OpenedAdmin}`}>
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
                {data && data.data.role === "admin" ? "مدیر" : data && data.data.role === "employee" ?
                  "کارمند" : ''}
              </span>
              <div className={styles.UserAccess}>
                <div className={`${styles.Edit} db-edit`}></div>
                <div className={`${styles.Notifications} db-notif`} ></div>
                <div className={`${styles.something} db-logout`} onClick={() => {
                  logout().then(res => console.log("you've been log out"));
                }}></div>
              </div>
            </div>
            <div className={styles.RoutesSide}>
              {Object.keys(availableRoutes).map(
                (route) =>
                  <Link href={`${urlCreator(route)}`} key={route}>
                    <a className={`${styles.RouteItem} deActive`}>
                      {availableRoutes[route]}
                    </a>
                  </Link>
              )}
            </div>
          <button onClick={() => setAdminMode(!adminMode)}>شسیب</button>
          </div>
          <div className={`${styles.Sidebar} ${!!adminMode ? styles.CollapsedUser : styles.OpenedUser}`}>
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
                {data && data.data.role === "admin" ? "مدیر" : data && data.data.role === "employee" ?
                  "کارمند" : ''}
              </span>
              <div className={styles.UserAccess}>
                <div className={`${styles.Edit} db-edit`}></div>
                <div className={`${styles.Notifications} db-notif`} ></div>
                <div className={`${styles.something} db-logout`} onClick={() => {
                  logout().then(res => console.log("you've been log out"));
                }}></div>
              </div>
            </div>
            <div className={styles.RoutesSide}>
              {Object.keys(availableRoutes).map(
                (route) =>
                  <Link href={`${urlCreator(route)}`} key={route}>
                    <a className={`${styles.RouteItem} deActive`}>
                      {availableRoutes[route]}
                    </a>
                  </Link>
              )}
            </div>
          <button onClick={() => setAdminMode(!adminMode)}>dfghjk</button>
          </div>
        </div>
      }
    </userContext.Consumer>
  )
}

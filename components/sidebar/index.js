import React, { useState, useEffect, useContext } from 'react'
import styles from '../../assets/styles/sidebar/sidebar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { me } from '../../services/Authentication/me'
import { logout } from '../../services/Authentication/logout'
import useSWR from 'swr'
import routes from '../../utils/sidebarRoutes'
import { userContext } from '../../pages/employees/[employeeID]'

export default function Sidebar() {
  const { data, error } = useSWR('Profile', me);
  const [availableRoutes, setAvailableRoutes] = useState(routes.selfAdmin);
  const [adminMode, setAdminMode] = useState(false);
  const [sidebar, setSidebar] = useState("ADMIN") //ADMIN or USER just in adminmode
  const user = useContext(userContext);
  const router = useRouter();
  useEffect(() => {
    if (data && data.data.role === "admin") {
      setAvailableRoutes(routes.selfAdmin)
      setSidebar("ADMIN")
    }
    else if (data && data.data.role === "employee") {
      setAvailableRoutes(routes.selfUser)
      setSidebar("ADMIN")
    }
    if (
      data &&
      data.data.role === "admin" &&
      router.pathname.includes("employees/")) {
        setAdminMode(true)
        setSidebar("USER")
      }
  }, [])
  useEffect(() => {
    console.log(user);
  }, [user])
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
        {/*Here USER mean admin access to user and if you are user, you are your admin */}
          <div className={`${styles.Sidebar} ${sidebar === "USER" && !!adminMode ? styles.OpenedUser : styles.CollapsedUser}`}>
            <div className={styles.UserInfoSide}>
              <div className={styles.UserImage}>
                <img src={"user.jpg"} alt={"esma karbar"} />
              </div>
              <span className={styles.UserInfo}>
                {user && user.first_name} {user && user.last_name}
              </span>
              <span className={`${styles.UserName} db-user`}>
                {user && user.username}
              </span>
              <span className={`${styles.UserLevel} db-level`}>
                {user && user.role === "admin" ? "مدیر" : user && user.role === "employee" ?
                  "کارمند" : ''}
              </span>
              <div className={styles.UserAccess}>
                <div className={`${styles.Edit} db-edit`}></div>
                <div className={`${styles.Notifications} db-notif`} ></div>
                <div className={`${styles.something} db-logout`} onClick={() => {
                  if (confirm('آیا مطمئن هستید که میخواهید خارج شوید؟')) {
                    router.push('/login')
                    logout().then(res => console.log("you've been log out"));
                  }
                }}></div>
              </div>
            </div>
            <div className={styles.RoutesSide}>
              {Object.keys(routes.adminUser).map(
                (route) =>
                  <Link href={`${urlCreator(route)}`} key={route}>
                    <a className={`${styles.RouteItem} deActive`}>
                      {routes.adminUser[route]}
                    </a>
                  </Link>
              )}
            </div>
            <button onClick={() => setSidebar("ADMIN")}>خودم</button>
          </div>
          <div className={`${styles.Sidebar} ${sidebar === "ADMIN" ? styles.OpenedAdmin : styles.CollapsedAdmin}`}>
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
                  if (confirm('آیا مطمئن هستید که میخواهید خارج شوید؟')) {
                    router.push('/login')
                    logout().then(res => console.log("you've been log out"));
                  }
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
            {adminMode && <button onClick={() => setSidebar("USER")}>کاربر</button>}
          </div>
        </div>
      }
    </userContext.Consumer>
  )
}

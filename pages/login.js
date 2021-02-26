import React, { useState } from 'react'
import Layout from '../layout'
import { Formik } from 'formik';
import LoginInput from '../components/Login/LoginInput'
import { useRouter } from 'next/router'
import style from '../assets/styles/login/Login.module.scss'
import FontAwesome from 'react-fontawesome'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [VisiblePass, setVisiblePass] = useState(false)
  const router = useRouter()
  return (
    <div className={style.LoginPage}>
      <Formik
        enableReinitialize
        initialValues={{
          USERNAME: "",
          PASSWORD: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          // setLoading(true);
          console.log(values);
          // setTimeout(() => {
          //   setLoading(false);
          // }, 2000);
          setSubmitting(false)
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <React.Fragment>
            <form onSubmit={handleSubmit}>
              <LoginInput
                name="USERNAME"
                id="USERNAME"
                type="text"
                label="نام کاربری"
                placeholder="لطفا نام کابری خود را وارد کنید"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.USERNAME}
                disabled={!!loading}
                autoComplete="off"
              />
              <div className={style.password}>
                <span
                  className={`${style.passwordVisibillity}`}
                  onClick={() => setVisiblePass(!!!VisiblePass)}>
                  {!VisiblePass ?
                    <FontAwesome
                      className="super-crazy-colors"
                      name="eye"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    /> :
                    <FontAwesome
                      className="super-crazy-colors"
                      name="eye-slash"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />}
                </span>
                <LoginInput
                  name="PASSWORD"
                  id="PASSWORD"
                  type={VisiblePass ? "text" : "password"}
                  label="رمز ورود"
                  placeholder="لطفا رمز عبور خود را وارد کنید"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.USERNAME}
                  disabled={!!loading}
                  autoComplete="off"
                />
              </div>
              <button type="submit"
                disabled={isSubmitting}
                className={style.Submit}>
                {!!loading ? <div className={style.loader} /> : "ورود"}
              </button>
            </form>
            <br /><br />
          </React.Fragment>
        )}
      </Formik>
    </div>
  )
}

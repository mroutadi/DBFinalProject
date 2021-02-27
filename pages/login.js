import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import { Formik } from 'formik';
import LoginInput from '../components/Login/LoginInput'
import { useRouter } from 'next/router'
import style from '../assets/styles/login/Login.module.scss'
import FontAwesome from 'react-fontawesome'
import { login } from '../services/Authentication/login'
import { attachJWT } from '../services/config'
export default function Login() {
  const [loading, setLoading] = useState(false)
  const [VisiblePass, setVisiblePass] = useState(false)
  const [initialValues, setInitialValues] = useState({
    USERNAME: "",
    PASSWORD: ""
  })
  const [ErrorStatus, setErrorStatus] = useState({
    USERNAME: null,
    PASSWORD: null
  });
  const [ErrorMessages, setErrorMessages] = useState({
    USERNAME: null,
    PASSWORD: null
  });
  const handleErrors = (
    usernameErr = "لطفا نام کاربری خود را وارد کنید!",
    passwordErr = "لطفا رمز ورود خود را وارد کنید!"
  ) => {
    let error = false;
    let ErrorMessages = {
      USERNAME: null,
      PASSWORD: null
    };
    //USERNAME
    if (!!!initialValues.USERNAME) {
      ErrorMessages.USERNAME = usernameErr;
      error = true;
    }
    //PASSWORD
    if (!!!initialValues.PASSWORD) {
      ErrorMessages.PASSWORD = passwordErr;
      error = true;
    }
    setErrorMessages({
      USERNAME: ErrorMessages.USERNAME,
      PASSWORD: ErrorMessages.PASSWORD
    })
    setErrorStatus({
      USERNAME: !!ErrorMessages.USERNAME,
      PASSWORD: !!ErrorMessages.PASSWORD
    })
    return error;
  }
  const router = useRouter()

  const handleChange = (event) => {
    setInitialValues({
      ...initialValues,
      [event.target.name]: event.target.value
    })
  }
  return (
    <div className={style.LoginPage}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          setSubmitting(true)
          if (handleErrors()) {
            setLoading(false);
          } else {
            login(values.USERNAME, values.PASSWORD)
              .then(
                response => response.data
              )
              .then(
                (res) => console.log("here we a have to redirect")
              ).catch(
                (err) => {
                  err && err.error && handleErrors(err.error.username[0], err.error.password[0])
                }
              )
            setLoading(false);
          }
          setSubmitting(false)
        }}
      >
        {({
          values,
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
                error={ErrorStatus.USERNAME && ErrorMessages.USERNAME}
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
                  value={values.PASSWORD}
                  disabled={!!loading}
                  autoComplete="off"
                  error={ErrorStatus.PASSWORD && ErrorMessages.PASSWORD}
                />
              </div>
              <button type="submit"
                disabled={isSubmitting}
                className={style.Submit}>
                {!!loading ? <div className={style.loader} /> : "ورود"}
              </button>
            </form>
            <br />
          </React.Fragment>
        )}
      </Formik>
    </div >
  )
}

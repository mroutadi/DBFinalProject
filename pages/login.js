import React, { useState, useEffect } from 'react'
import Layout from '../layout'
import { Formik } from 'formik';
import LoginInput from '../components/Login/LoginInput'
import { useRouter } from 'next/router'
import style from '../assets/styles/login/Login.module.scss'
import FontAwesome from 'react-fontawesome'

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
  const handleErrors = () => {
    let ErrorMessages = {
      USERNAME: null,
      PASSWORD: null
    };
    //USERNAME
    if (!!!initialValues.USERNAME) {
      ErrorMessages.USERNAME = "لطفا نام کاربری خود را وارد کنید!"
    }
    //PASSWORD
    if (!!!initialValues.PASSWORD) {
      ErrorMessages.PASSWORD = "لطفا رمز ورود خود را وارد کنید!"
    }
    setErrorMessages({
      USERNAME: ErrorMessages.USERNAME,
      PASSWORD: ErrorMessages.PASSWORD
    })
    setErrorStatus({
      USERNAME: !!ErrorMessages.USERNAME,
      PASSWORD: !!ErrorMessages.PASSWORD
    })
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

          handleErrors();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
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
            <br /><br />
          </React.Fragment>
        )}
      </Formik>
    </div>
  )
}

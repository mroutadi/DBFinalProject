import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../layout'
import { Formik } from 'formik'
import HOC from '../../hoc'
import SimpleInput from '../../components/Forms/SimpleInput'
import simpleInputStyle from '../../assets/styles/form/simpleInput.module.scss'
import formStyle from '../../assets/styles/form/form.module.scss'
import { newEmployee } from '../../services/Employee/newEmployee'


export default function Employee() {

  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    username: "",
    national_id: "",
    Role: "",
    password: "",
    passwordConfirm: ""
  })
  const [ErrorStatus, setErrorStatus] = useState({
    first_name: null,
    last_name: null,
    phone_number: null,
    username: null,
    national_id: null,
    Role: null,
    password: null,
    passwordConfirm: null
  });
  const [ErrorMessages, setErrorMessages] = useState({
    first_name: null,
    last_name: null,
    phone_number: null,
    username: null,
    national_id: null,
    Role: null,
  });
  const handleErrors = (errs) => {
    let error = false;
    let ErrorMessages = {
      first_name: null,
      last_name: null,
      phone_number: null,
      username: null,
      national_id: null,
      Role: null,
      password: null,
      passwordConfirm: null,
    };
    //passwordConfirm
    console.log(initialValues);
    if (!!initialValues.passwordConfirm && !!initialValues.password && (initialValues.passwordConfirm !== initialValues.password)) {

      ErrorMessages.passwordConfirm = "رمز عبور تکراری درست نیست";
      error = true;
    }
    Object.keys(initialValues).map(
      (value) => {
        if (errs[value]) {
          ErrorMessages[value] = errs[value][0];
          error = true;
        }
        else if (!!!initialValues[value]) {
          ErrorMessages[value] = value;
          error = true;
        }
      }
    )
    setErrorMessages({
      first_name: ErrorMessages.first_name,
      last_name: ErrorMessages.last_name,
      phone_number: ErrorMessages.phone_number,
      username: ErrorMessages.username,
      national_id: ErrorMessages.national_id,
      Role: ErrorMessages.Role,
      password: ErrorMessages.password,
      passwordConfirm: ErrorMessages.passwordConfirm,
    })
    setErrorStatus({
      first_name: !!ErrorMessages.first_name,
      last_name: !!ErrorMessages.last_name,
      phone_number: !!ErrorMessages.phone_number,
      username: !!ErrorMessages.username,
      national_id: !!ErrorMessages.national_id,
      Role: !!ErrorMessages.Role,
      password: !!ErrorMessages.password,
      passwordConfirm: !!ErrorMessages.passwordConfirm,
    })
    return error;
  }
  const handleChange = (event) => {
    setInitialValues({
      ...initialValues,
      [event.target.name]: event.target.value
    })
  }

  return (
    <HOC access={["admin"]}>
      <Layout>
        <h1 className={simpleInputStyle.Title}>افزودن کارمند جدید</h1>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            setLoading(true);
            setSubmitting(true)
            if (handleErrors([])) {
              setLoading(false);
            } else {
              newEmployee(values)
                .then(
                  response => response && response.data
                ).then(
                  data => {
                    console.log("user Added Successfully");
                    setTimeout(() => {
                      router.push("/employees")
                    }, 1000);
                  }
                  ).catch(
                  (err) => {
                    console.log(err.response);
                    err.response.status === 422 && handleErrors(err.response.data.errors)
                  }
                )
              setLoading(false);
            }
            // setSubmitting(false)
            console.log(values)
          }}>
          {({
            values,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <div className={formStyle.formContainer}>
                  <SimpleInput
                    name="first_name"
                    id="first_name"
                    type="text"
                    label="*نام"
                    placeholder="لطفا نام کابر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.first_name}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.first_name && ErrorMessages.first_name}
                  />
                  <SimpleInput
                    name="last_name"
                    id="last_name"
                    type="text"
                    label="*نام خانوادگی"
                    placeholder="لطفا نام خانوادگی کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.last_name}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.last_name && ErrorMessages.last_name}
                  />
                  <SimpleInput
                    name="phone_number"
                    id="phone_number"
                    type="text"
                    label="*شماره همراه"
                    placeholder="لطفا شماره همراه کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.phone_number && ErrorMessages.phone_number}
                  />
                  <SimpleInput
                    name="username"
                    id="username"
                    type="text"
                    label="*نام کاربری"
                    placeholder="لطفا نام کاربری کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.username && ErrorMessages.username}
                  />
                  <SimpleInput
                    name="national_id"
                    id="national_id"
                    type="text"
                    label="*کد ملی"
                    placeholder="لطفا کد ملی کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.national_id}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.national_id && ErrorMessages.national_id}
                  />
                  <SimpleInput
                    name="Role"
                    id="Role"
                    type="text"
                    label="*سِمَت کاربر"
                    placeholder="لطفا سطح دسترسی کاربر را انتخاب کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Role}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.Role && ErrorMessages.Role}
                  />
                </div>
                <br /><br /><br />
                <div className={formStyle.formContainer}>
                  <SimpleInput
                    name="password"
                    id="password"
                    type="text"
                    label="*رمز ورود"
                    placeholder="لطفا برای کاربر رمز ورود اولیه تعیین کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.password && ErrorMessages.password}
                  />
                  <SimpleInput
                    name="passwordConfirm"
                    id="passwordConfirm"
                    type="text"
                    label="*تکرار رمز ورود"
                    placeholder="لطفا رمز عبور را تکرار کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.passwordConfirm && ErrorMessages.passwordConfirm}
                  />
                </div>
                <button type="submit"
                  disabled={isSubmitting}
                  className={simpleInputStyle.Submit}>
                  {!!loading ? <div className={simpleInputStyle.loader} /> : "افزودن"}
                </button>
              </form>
              <br />
            </React.Fragment>
          )}
        </Formik>
      </Layout>
    </HOC>
  )
}
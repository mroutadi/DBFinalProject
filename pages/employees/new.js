import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../layout'
import { Formik } from 'formik'
import HOC from '../../hoc'
import SimpleInput from '../../components/Forms/SimpleInput'
import simpleInputStyle from '../../assets/styles/form/simpleInput.module.scss'
import formStyle from '../../assets/styles/form/form.module.scss'


export default function Employee() {

  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const [initialValues, setInitialValues] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    UserName: "",
    NationalID: "",
    Role: "",
    CompanyId: "",
  })
  const [ErrorStatus, setErrorStatus] = useState({
    FirstName: null,
    LastName: null,
    PhoneNumber: null,
    UserName: null,
    NationalID: null,
    Role: null,
    CompanyId: null,
  });
  const [ErrorMessages, setErrorMessages] = useState({
    FirstName: null,
    LastName: null,
    PhoneNumber: null,
    UserName: null,
    NationalID: null,
    Role: null,
    CompanyId: null,
  });
  const handleErrors = () => {
    let error = false;
    let ErrorMessages = {
      FirstName: null,
      LastName: null,
      PhoneNumber: null,
      UserName: null,
      NationalID: null,
      Role: null,
      CompanyId: null,
    };
    //FirstName
    if (!!!initialValues.FirstName) {
      ErrorMessages.FirstName = "FirstName";
      error = true;
    }
    //LastName
    if (!!!initialValues.LastName) {
      ErrorMessages.LastName = "LastName";
      error = true;
    }
    //PhoneNumber
    if (!!!initialValues.PhoneNumber) {
      ErrorMessages.PhoneNumber = "PhoneNumber";
      error = true;
    }
    //UserName
    if (!!!initialValues.UserName) {
      ErrorMessages.UserName = "UserName";
      error = true;
    }
    //NationalID
    if (!!!initialValues.NationalID) {
      ErrorMessages.NationalID = "NationalID";
      error = true;
    }
    //Role
    if (!!!initialValues.Role) {
      ErrorMessages.Role = "Role";
      error = true;
    }
    //CompanyId
    if (!!!initialValues.CompanyId) {
      ErrorMessages.CompanyId = "CompanyId";
      error = true;
    }
    setErrorMessages({
      FirstName: ErrorMessages.FirstName,
      LastName: ErrorMessages.LastName,
      PhoneNumber: ErrorMessages.PhoneNumber,
      UserName: ErrorMessages.UserName,
      NationalID: ErrorMessages.NationalID,
      Role: ErrorMessages.Role,
      CompanyId: ErrorMessages.CompanyId,
    })
    setErrorStatus({
      FirstName: !!ErrorMessages.FirstName,
      LastName: !!ErrorMessages.LastName,
      PhoneNumber: !!ErrorMessages.PhoneNumber,
      UserName: !!ErrorMessages.UserName,
      NationalID: !!ErrorMessages.NationalID,
      Role: !!ErrorMessages.Role,
      CompanyId: !!ErrorMessages.CompanyId,
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
            // setLoading(true);
            // setSubmitting(true)
            // if (handleErrors()) {
            //   setLoading(false);
            // } else {
            //   login(values.USERNAME, values.PASSWORD)
            //     .then(
            //       response => response.data
            //     )
            //     .then(
            //       (res) => {
            //         attachJWT(res.access_token)
            //         router.push("/employees")
            //       }
            //     ).catch(
            //       (err) => {
            //         err && err.error && handleErrors(err.error.username[0], err.error.password[0])
            //       }
            //     )
            //   setLoading(false);
            // }
            // setSubmitting(false)
            console.log(values);
          }
        }
        >
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
                    name="FirstName"
                    id="FirstName"
                    type="text"
                    label="نام"
                    placeholder="لطفا نام کابر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.FirstName}
                    disabled={!!loading}
                    error={ErrorStatus.FirstName && ErrorMessages.FirstName}
                  />
                  <SimpleInput
                    name="LastName"
                    id="LastName"
                    type="text"
                    label="نام خانوادگی"
                    placeholder="لطفا نام خانوادگی کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.LastName}
                    disabled={!!loading}
                    error={ErrorStatus.LastName && ErrorMessages.LastName}
                  />
                  <SimpleInput
                    name="PhoneNumber"
                    id="PhoneNumber"
                    type="text"
                    label="شماره همراه"
                    placeholder="لطفا شماره همراه کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.PhoneNumber}
                    disabled={!!loading}
                    error={ErrorStatus.PhoneNumber && ErrorMessages.PhoneNumber}
                  />
                  <SimpleInput
                    name="UserName"
                    id="UserName"
                    type="text"
                    label="نام کاربری"
                    placeholder="لطفا نام کاربری کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.UserName}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.UserName && ErrorMessages.UserName}
                  />
                  <SimpleInput
                    name="NationalID"
                    id="NationalID"
                    type="text"
                    label="کد ملی"
                    placeholder="لطفا کد ملی کاربر را وارد کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.NationalID}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.NationalID && ErrorMessages.NationalID}
                  />
                  <SimpleInput
                    name="Role"
                    id="Role"
                    type="text"
                    label="سِمَت کاربر"
                    placeholder="لطفا سطح دسترسی کاربر را انتخاب کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.Role}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.Role && ErrorMessages.Role}
                  />
                  <SimpleInput
                    name="CompanyId"
                    id="CompanyId"
                    type="text"
                    label="اسم شرکت"
                    placeholder="لطفا اسم شرکت کاربر را انتخاب کنید"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.CompanyId}
                    disabled={!!loading}
                    autoComplete="off"
                    error={ErrorStatus.CompanyId && ErrorMessages.CompanyId}
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
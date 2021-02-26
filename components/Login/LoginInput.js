import React from 'react'
import style from '../../assets/styles/login/Login.module.scss'

export default function LoginInput(props) {
  return (
    <div className={style.SimpleInput}>
      <label>{props.label}</label>
      <input type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
      >
      </input>
    </div>
  )
}

import React from 'react'
import style from '../../assets/styles/form/simpleInput.module.scss'

export default function SimpleInput(props) {
  return (
    <div className={style.SimpleInput}>
      <label>{props.label}</label>
      <input type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}
        autoComplete={props.autoComplete}
      >
      </input>
      {props.error && <span className={style.Error}>{props.error}</span>}
    </div>
  )
}

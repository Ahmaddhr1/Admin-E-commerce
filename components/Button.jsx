import React from 'react'

const Button = ({style,text,icon,type,onclick}) => {
  return (
    <button type={type} className={style} onClick={onclick}>
      <p>{text}</p>
      {icon && <i className={`fi fi-rr-${icon} flex items-center text-lg`}></i>}
    </button>
  )
}

export default Button
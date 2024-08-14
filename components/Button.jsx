import React from 'react'

const Button = ({style,text,icon,type,onclick ,disabled}) => {
  return (
    <button type={type} className={`${style} ${disabled ? 'opacity-45 cursor-not-allowed ':' cursor-pointer'}`} onClick={onclick} disabled={disabled}>
      <p>{text}</p>
      {icon && <i className={`fi fi-rr-${icon} flex items-center text-lg`}></i>}
    </button>
  )
}

export default Button
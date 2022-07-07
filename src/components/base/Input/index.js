import React from 'react'
import styles from './input.module.css'

const Input = ({type, name, value, placeholder, onChange}) => {
  return (
    <div className={styles.input}>
        <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}

export default Input
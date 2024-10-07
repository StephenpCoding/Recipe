import React from 'react'
import styles from './index.module.scss'
import { styled } from '@/utils'

const Button = (props) => {

  const { className, ...rest } = props

  return (
    <span className={styled(styles, className, 'btn', ' btn-primary')}{...rest} />
  )
}

export default Button






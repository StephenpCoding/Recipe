import React from 'react'
import { styled } from '@/utils'
import styles from './index.module.scss'


const Instruction = (props) => {
  const {
    instructions,
    className,
    ...rest
  } = props


  return (
    <div className={styled(styles, 'instruction', className)} {...rest}>
      <span className={styled(styles, 'instruction_title')}>
        Instructions: 
      </span>
      {//如果instructions是一个数组，则遍历
        Array.isArray(instructions) && instructions.map((instruction, index) => (
          <span key={index} className={styled(styles, 'instruction_item')}>
            {instruction}
          </span>
        ))
      }
    </div>
  )
}

export default Instruction
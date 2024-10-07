import React from 'react'
import { styled } from '@/utils'
import styles from './index.module.scss'
import Ingredient from '@/components/Ingredient'
import Instruction from '@/components/Instruction'


const Panel = (props) => {
  const {
    cookTime,
    servings,
    instructions,
    ingredients,
    className
  } = props

  return (
    <div className={styled(styles, 'panel', className)}>
      <div>
        <span className={styled(styles, 'title')}>Cooke Time: </span>
        <span className={styled(styles, 'info')}>{cookTime}</span>

      </div>

      <div>
        <span className={styled(styles, 'title')}>Servings: </span>
        <span className={styled(styles, 'title')}>{servings}</span>
      </div>

      <Instruction instructions={instructions} />
      <Ingredient ingredients={ingredients} />
    </div>
  )
}

export default Panel
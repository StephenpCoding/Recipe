import React from 'react'
import Button from '@/components/Button'
import { styled } from '@/utils'
import styles from './index.module.scss'

const Header = (props) => {

  const { id,
    title,
    deleteHandler,
    className,
    ...rest } = props

  return (
    <div className={styled(styles, 'recipe_header', className)}>
      <h3 className={styled(styles, 'recipe_title')}>
        {title}
      </h3>
      <div className={styled(styles, 'recipe_btn_group')}>
        <Button className='btn-danger' onClick={e => { e.stopPropagation(); deleteHandler(id) }}>Delete</Button>
      </div>
    </div>
  )
}

export default Header
import React from 'react'
import styles from './index.module.scss'
import { classNameStyled, styled } from '@/utils'

import Button from '@/components/Button'
import Header from '@/components/Header'
import Panel from '@/components/Panel'

const RecipeList = (props) => {

  const {
    recipes,
    selectedRecipeId,//选中的id
    lastSelectedRecipeId,
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    className
  } = props

  const [newAddRecipe, setNewAddRecipe] = React.useState(false)//触发器
  const ref = React.useRef()

  const addRecipe = () => {
    handleRecipeAdd()
    setNewAddRecipe(true)//触发器滚动
  }

  React.useEffect(() => {
    if (newAddRecipe) {
      setTimeout(() => {//使用了setTimeout 浏览器在执行addRecipe时候，就会等待newAddRecipe设置完之后在执行，不会同时执行useEffect
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })//滚动到ref标记的位置
      }, 0)
      setNewAddRecipe(false)
    }
  }, [newAddRecipe])//如果触发器变动则重新渲染

  return (
    <div className={styled(styles, className, 'container')}>
      <div className={styles['title']}>
        TopCoder Recipe Book
      </div>
      <div className={styles['add']}>
        <Button className="btn-big" onClick={addRecipe}>Add Recipe</Button>
      </div>

      <div>
        {
          recipes.map((recipe, index) => (
            <Recipe
              key={index}
              {...recipe}
              lastSelectedRecipeId={lastSelectedRecipeId}
              selectedRecipeId={selectedRecipeId}
              handleRecipeDelete={handleRecipeDelete}
              handleRecipeSelect={handleRecipeSelect}
            />
          ))
        }
      </div>

      <div className={styles['add']}>
        <Button className="btn-big" onClick={
          addRecipe
        }>Add Recipe</Button>
      </div>
      {/* 在对下面标记ref */}
      <div className={styles['the-end']} ref={ref}></div>

    </div >
  )
}


const Recipe = (props) => {
  const {
    id,
    name,
    cookTime,
    servings,
    instructions,
    ingredients,
    className,
    selectedRecipeId,
    lastSelectedRecipeId,
    handleRecipeDelete,
    handleRecipeSelect,
  } = props

  const [chosen, setChosen] = React.useState('')
  const [lastChosen, setLastChosen] = React.useState('')

  //判断这个id是不是当前被选中的，如果是则设置chosen状态，对应的css样式是蓝色的
  React.useEffect(() => {
    selectedRecipeId === id ? setChosen('chosen') : setChosen('')
  }, [selectedRecipeId])

  React.useEffect(() => {
    lastSelectedRecipeId === id ? setLastChosen('last-chosen') : setLastChosen('')
  }, [lastSelectedRecipeId])

  return (
    <div
      className={styled(styles, className, 'recipe', chosen, lastChosen)}//选中就加入chosen对应的css样式是蓝色的
      onClick={() => {
        setChosen('chosen')
        handleRecipeSelect(id)
      }}
    >
      <Header
        id={id}
        title={name}
        deleteHandler={handleRecipeDelete}
      />
      <Panel
        id={id}
        cookTime={cookTime}
        servings={servings}
        instructions={instructions}
        ingredients={ingredients}
      />
    </div >
  )
}

export default RecipeList
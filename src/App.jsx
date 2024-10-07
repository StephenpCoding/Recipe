import React from 'react'
import { v4 as uuidV4 } from 'uuid'
//默认区对应文件夹优先找index.jsx，如果是其他名字，则需要写进去
import RecipeList from "@/components/Recipe"
import EditorPanel from "@/components/Editor"

const sampleRecipes = [
  {
    id: uuidV4(),
    name: "Plain Chicken",
    servings: 3,
    cookTime: "2:45",
    instructions: [
      "Put salt on Chicken",
      "Put chicken in oven",
      "Eat chicken"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:45",
    instructions: [
      "Put paprika on Pork",
      "Put pork in oven",
      "Eat pork"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  },
  {
    id: uuidV4(),
    name: "Plain Apple Pai",
    servings: 10,
    cookTime: "3:45",
    instructions: [
      "Put apples in pie",
      "Put pie in oven",
      "Eat pie"
    ],
    ingredients: [
      {
        id: uuidV4(),
        name: "Pork",
        amount: "2 Pounds"
      },
      {
        id: uuidV4(),
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
]

const recipesKey = import.meta.env.VITE_RECIPES_KEY
const selectedRecipeIdKey = import.meta.env.VITE_SELECTED_RECIPE_ID_KEY
const lastSelectedRecipeIdKey = import.meta.env.VITE_LAST_SELECTED_RECIPE_ID_KEY

const App = () => {
  //1.先获取localStorage的，如果没有就用sample里面的
  const [recipes, setRecipes] = React.useState(() => {
    const localData = localStorage.getItem(recipesKey)
    return localData ? JSON.parse(localData) : sampleRecipes
  })

  React.useEffect(() => {
    localStorage.setItem(recipesKey, JSON.stringify(recipes))
  }, [recipes])

  const [selectedRecipeId, setSelectedRecipeId] = React.useState(() => {
    const localData = localStorage.getItem(selectedRecipeIdKey)
    return localData ? JSON.parse(localData) : null
  })

  React.useEffect(() => {
    localStorage.setItem(selectedRecipeIdKey, JSON.stringify(selectedRecipeId))
  }, [selectedRecipeId])

  const [lastSelectedRecipeId, setLastSelectedRecipeId] = React.useState(() => {
    const localData = localStorage.getItem(lastSelectedRecipeIdKey)
    return localData ? JSON.parse(localData) : null
  })

  React.useEffect(() => {
    localStorage.setItem(lastSelectedRecipeIdKey, JSON.stringify(lastSelectedRecipeId))
  }, [lastSelectedRecipeId])


  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidV4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: ["New Instruction 1", "New Instruction 2"],
      ingredients: [
        {
          id: uuidV4(),
          name: 'demo',
          amount: '1 Tbs'
        }
      ]
    }
    handleRecipeSelect(newRecipe.id)//设置新添加的为选中id
    setRecipes([...recipes, newRecipe])//合并两个对象到一个数组中
  }

  //通过id删除，回传获取id:  重新设置所有recipes是不等于id的
  function handleRecipeDelete(id) {
    if (selectedRecipeId !== null && id === selectedRecipeId) {
      setSelectedRecipeId(null)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeSelect(id) {
    //点击recipe就是已经选中的，就取消last选中的淡蓝色
    if (!selectedRecipeId && id === lastSelectedRecipeId) {
      setLastSelectedRecipeId(null)
    } else if (selectedRecipeId && id != selectedRecipeId) {//选中的是其他
      setLastSelectedRecipeId(selectedRecipeId)
    }
    //设置当前选中id
    setSelectedRecipeId(id)
  }

  function handleSelectRecipe() {
    return recipes.find(recipe => recipe.id === selectedRecipeId)
  }

  //recipe：表示新的菜谱对象，包含需要更新的内容。
  function handleRecipeChange(id, recipe) {
    //复制所有的菜谱：
    const newRecipes = [...recipes]
    //找到要修改的菜谱索引：
    const index = newRecipes.findIndex(r => r.id === id)
    //更新对应的菜谱：
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  return (
    <>
      <RecipeList
        recipes={recipes}
        selectedRecipeId={selectedRecipeId}
        lastSelectedRecipeId={lastSelectedRecipeId}
        handleRecipeAdd={handleRecipeAdd}
        handleRecipeDelete={handleRecipeDelete}
        handleRecipeSelect={handleRecipeSelect}
      />
      {
        //选中一个id之后才显示panel信息
        selectedRecipeId &&
        <EditorPanel
          handleSelectRecipe={handleSelectRecipe}//返回被选中的菜单实体
          handleRecipeChange={handleRecipeChange}//更新菜单
          handleRecipeSelect={handleRecipeSelect}//设置选中id
        />
      }
    </>
  )
}

export default App
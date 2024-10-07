//这段代码定义了一个名为 classNameStyled的函数，它的作用是将常规的类名与CSS Modules 
//的样式类名组合，并且将所有类名转换为适合使用的字符串形式


//preClassNames参数：额外类名，跟classNames合并到一起
export function classNameStyled(classNames, styles, preClassNames) {
  //把多个类名转成list形式
  // "btn btn-primary = > ['btn', 'btn-primary']" 
  const classList = classNames ? classNames.split(' ') : []
  const preClassList = preClassNames ? preClassNames.split(' ') : []

  //preClassNames 的具体作用：
  //作为额外的类名：你可以通过 preClassNames 传递一组类名，它们将被加入到最终生成的类名列表中
  //通常是某些预定义的、你希望始终存在的类名。优先于 classNames 的类名：
  //在代码中，preClassListStyled 是在 classListStyled 之前合并的，
  //确保 preClassNames 的类名在最终结果中优先出现。
  const classListStyled = classList.map(className => styles[className] || className)
  const preClassListStyled = preClassList.map(className => styles[className] || className)

  //将两个数组合并，然后用join连接成每个元素之间有一个空格的字符串
  return [...preClassListStyled, ...classListStyled].join(' ')
}


export function styled(styles, ...rest) {
  const classList = []
  rest.forEach(classNames => {
    if (!classNames) return
    classNames.split(' ').forEach(className => {
      className && classList.push(styles[className] || className)//类名判断：如果类名存在，则检查 styles 对象中是否存在该类名的映射。如果存在，使用映射值；如果不存在，直接使用原始类名。
    })
  })
  return classList.join(' ')
}
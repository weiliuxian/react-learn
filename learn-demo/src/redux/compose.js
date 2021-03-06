

export default function(...funcs){
  if(funcs.length === 0){
    return args => args
  }else if(funcs.length === 1){
    return funcs[0]
  }

  // return funcs.reduce((a,b)=> (...args) => a(b(...args)))

  return function(...args){
    let lastReturn = null   // 记录上一个函数的返回值，它将作为下一个函数的参数
    for(let i = funcs.length - 1; i >= 0; i--){
      const func = funcs[i]
      if(i === funcs.length - 1){
        lastReturn = func(...args)
      }else {
        lastReturn = func(lastReturn)
      }
      
    }
    return lastReturn
  }
}
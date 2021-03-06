import compose from './compose'
/**
 * 
 * @param  {...any} middlewares 注册中间件
 */
export default function(...middlewares){
  return function(createStore){
    return function(reducer, defaultState){
      const store = createStore(reducer, defaultState)
      let dispatch = ()=>  {throw new Error('目前还不能使用dispatch') }
      const simpleStore = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      //根据中间件数组，得到一个dispatch创建函数的数组
      const dispatchProducers = middlewares.map(mid=> mid(simpleStore))
      const dispathProducer = compose(...dispatchProducers)
      dispatch = dispathProducer(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}
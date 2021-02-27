
/**
 * 将一个location对象，转换为字符串链接
 */
export function parseLocation(location, history){
  return history.createHref(location)
  
}
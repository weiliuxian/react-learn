
/**
 * 判断某个对象是否是一个平面对象
 * @param {*} obj 
 */
export default function isPlainObject(obj){
  if(typeof obj !== 'object'){
      return false;
  }
  return Object.getPrototypeOf(obj) === Object.prototype;
}


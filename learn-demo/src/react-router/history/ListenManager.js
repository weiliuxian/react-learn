export default class ListenerManager {

  // 存放监听器的数组
  listeners = []
  /**
   * 
   * @param {*} listener 
   */
  addListener(listener){
    this.listeners.push(listener);
    const unListen = () => {
      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index,1);
    }
    return unListen;
  }

  /**
   * 触发所有监听器
   * @param {*} location 
   * @param {*} action 
   */
  triggerListener(location, action){
    for (const listener of this.listeners) {
      listener(location, action)
    }
  }
}
import BlockManager from "./BlockManager"
import ListenerManager from "./ListenManager"

/**
 * 创建一个history api的history对象
 * @param {*} options 
 */
export default function createBrowserHistory(options = {}){
  const { 
    basename = '', 
    forceRefresh = false,
    keyLength = 6,
    getUserConfimation = (msg,callback) => callback(window.confirm(msg))
  } = options

  const listenerManager = new ListenerManager()
  const blockManager = new BlockManager(getUserConfimation)

  function go(step){
    window.history.go(step)
  }
  function goBack(step){
    window.history.back(step)
  }
  function goForward(step){
    window.history.forward(step)
  }
  /**
   * 向地址栈中加入一个新的地址
   * @param {*} path 新的地址，可以是字符串，也可以是对象
   * @param {*} state 附加的状态数据，如果第一个参数path是一个对象，该参数无效
   */
  function push(path, state) {
    changePage(path, state, true)
  }

  function replace(path, state) {
    changePage(path, state, false)
  }

  /**
   * 抽离的，可用于实现push或replace功能的方法
   * @param {*} path 
   * @param {*} state 
   * @param {*} isPush 
   */
  function changePage(path, state, isPush) {
    
    let action = 'PUSH'
    if(!isPush){
      action = 'REPLACE'
    }
    const pathInfo = handlePathAndState(path, state, basename);
    const location = createLocationFromPath(pathInfo, basename)
    blockManager.triggerBlock(location, action, () => {
      if(isPush){
        window.history.pushState({
          key: createKey(keyLength),
          state: pathInfo.state
        }, null, pathInfo.path)
      }else {
        window.history.replaceState({
          key: createKey(keyLength),
          state: pathInfo.state
        }, null, pathInfo.path)
      }

      listenerManager.triggerListener(location, action);

      // 改变action
      history.action = action;
      // 改变location
      history.location = location
      
      if(forceRefresh){
        window.location.href = pathInfo.path;
      }
    })
  }

  /**
   * 添加一个监听器，并且返回一个可用于取消监听的函数
   * @param {*} listener 
   */
  
  function listen(listener) {
    return listenerManager.addListener(listener)
  }

  /**
   * 添加对地址变化的监听
   */
  (function addDomListener() {
    // popstate事件，仅能监听前进、后退、用户对地址hash的改变，
    // 无法监听到pushState、replaceState
    window.addEventListener('popstate', function() {
      const location = createLocation(basename)
      blockManager.triggerBlock(location, 'POP', () => {
        listenerManager.triggerListener(location, 'POP');
        history.location = location;
      })
    })
  })()

  function block(prompt){
    return blockManager.block(prompt);
  }

  function createHref(location){
    const {pathname = '/', search = '', hash = ''} = location
    return basename + pathname + search + hash;
  }

  const history = {
    action: 'POP',
    length: window.history.length,
    go,
    goBack,
    goForward,
    push,
    replace,
    listen,
    block,
    createHref,
    location: createLocation(basename)
  }
  // 返回history对象
  return history;
}

/**
 * 根据path和state得到一个统一的对象格式
 * @param {*} path 
 * @param {*} state 
 */
function handlePathAndState(path, state, basename) {
  if(typeof path === 'string'){
    return {
      path,
      state
    }
  }else if(typeof path === 'object'){
    let pathResult = basename + path.pathname
    let {search = '', hash = ''} = path
    if(search.chartAt(0) !== '?'){
      search = '?' + search;
    }
    if(hash.chartAt(0) !== '#'){
      hash = '#' + hash;
    }
    pathResult += search
    pathResult += hash

    return {
      path: pathResult,
      state: path.state
    }
  }else {
    throw new Error('path must be string or object')
  }
}

/**
 * 创建一个lication对象
 */
function createLocation(basename = ''){
  
  let pathname = window.location.pathname
  // 处理pathname的情况
  const reg = new RegExp(`^${basename}`)
  pathname = pathname.replace(reg, '')

  const location = {
    hash: window.location.hash,
    search: window.location.search,
    pathname,
  };

  // 处理state
  let state, historyState = window.history.state;
  if(historyState === null){
    state = undefined;
  }else if(typeof historyState !== 'object'){
    state = historyState;
  }else {
    if('key' in historyState){
      location.key = historyState.key;
      state = historyState;
    }else {
      state = historyState
    }
  }
  location.state = state;

  return location
}

/**
 * 根据pathInfo得到一个location对象
 * @param {*} pathInfo 
 * @param {*} basename 
 */
function createLocationFromPath(pathInfo, basename){
  const wenhaoIndex = pathInfo.path.indexOf('?');
  const sharpIndex = pathInfo.path.indexOf('#');
  // 取出pathname
  let pathname;
  pathname = pathInfo.path.replace(/[#?].*$/, '')
  let reg = new RegExp(`^${basename}`)
  pathname = pathname.replace(reg, '')

  // 取出search
  let search;
  if(wenhaoIndex === -1 || wenhaoIndex > sharpIndex){
    search = '';
  }else {
    search = pathInfo.path.substr(wenhaoIndex, sharpIndex)
  }

  // hash
  let hash;
  if(sharpIndex === -1){
    hash = '';
  }else {
    hash = pathInfo.path.substr(sharpIndex);
  }

  return {
    hash,
    pathname,
    search,
    state: pathInfo.state
  }

}

/**
 * 产生一个指定长度的字符串，随机字符串中可以包含数字和字母
 * @param {*} keyLength 
 */
function createKey(keyLength) {
  return Math.random().toString(36).substr(2,keyLength);
}

import {createBrowserHistory} from 'history'
window.createBrowserHistory = createBrowserHistory
window.h = createBrowserHistory({
  basename: '/news',
  forceRefresh: true,
  keyLength: 4,
  getUserConfirmation: (message,callback) => console.log('getUserConfirmation')
})

// console.log(history)
window.unListen = window.h.listen((location,action)=>{
  console.log('地址发生年华了',location)
})
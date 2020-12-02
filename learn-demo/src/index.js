import React from 'react';
import ReactDOM from 'react-dom';
// import StudentList from './components/StudentList';
// import Tick from './components/Tick'
// import BallList from './components/BallList'
// import MyComp from './components//MyComp'
// import TickControl from './components/TickControl'
import Pager from './components/Pager'
import PagerTest from './components/PagerTest'


const container = document.getElementById('root');
// ReactDOM.render(<Pager current={1} total={100} limit={9} panelNumber={5} />,container)
ReactDOM.render(<PagerTest />,container)

// function handle(){
//     console.log('点击了')
// }

// const btn = <button onClick={handle}>点击我</button>
// const btn = <button onClick={()=> {console.log('点击了')}}>点击我</button>

// ReactDOM.render(<TickControl />,container)
// let num = 60;
// function start(){
//   const timer = setInterval(()=>{
//     num--;
//     if(num < 0){
//       clearInterval(timer);
//       return;
//     }
//     ReactDOM.render(<Tick number={num} />,container)

//   },1000)
// }
// start()

// ReactDOM.render(<BallList  />,container)
// ReactDOM.render(<Tick number={10} />,container)
// const list = [
//   {name:'张三222',sex:'男',id:'11111'},
//   {name:'王五',sex:'男',id:'3333'},
//   {name:'王五',sex:'男',id:'4444'},
//   {name:'李四',sex:'女',id:'22222'}
// ]
// console.log('StudentList', <ul>sdfd</ul>)
// ReactDOM.render(
//  <div>
//   <StudentList list={list}/>
//  </div>,
//   document.getElementById('root')
// );

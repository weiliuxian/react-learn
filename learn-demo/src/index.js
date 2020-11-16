import React from 'react';
import ReactDOM from 'react-dom';
// import StudentList from './components/StudentList';
import Tick from './components/Tick'


const container = document.getElementById('root');
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

ReactDOM.render(<Tick number={10} />,container)
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

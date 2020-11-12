import React from 'react';
import ReactDOM from 'react-dom';
import StudentList from './components/StudentList';
const list = [
  {name:'张三222',sex:'男',id:'11111'},
  {name:'王五',sex:'男',id:'3333'},
  {name:'王五',sex:'男',id:'4444'},
  {name:'李四',sex:'女',id:'22222'}
]
console.log('StudentList', <ul>sdfd</ul>)
ReactDOM.render(
 <div>
  <StudentList list={list}/>
 </div>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {searchStudents} from './services/student'

ReactDOM.render((<App/>),document.getElementById('root'))
searchStudents({key:'男'}).then(res => console.log(res))
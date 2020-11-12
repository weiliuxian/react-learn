import React from 'react';
import Student from './Student'

function StudentList(props) {
  const studentList = props.list.map(item => <Student name={item.name} sex={item.sex} id={item.id} key={item.id} />)
  console.log(studentList)
  return (
    <ul>
      {studentList}
    </ul>
  );
}

export default StudentList;
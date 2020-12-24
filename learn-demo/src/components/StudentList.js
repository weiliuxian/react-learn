import React from 'react';
import Student from './Student'

function StudentList(props) {
  const studentList = props.stus.map(item => <Student {...item} key={item.id} />)
  console.log(studentList)
  return (
    <ul>
      {studentList}
    </ul>
  );
}

export default StudentList;
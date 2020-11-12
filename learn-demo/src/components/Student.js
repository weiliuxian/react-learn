import React from 'react';

function Student(props) {
  return (
    <li>
      【id】：{props.id},
      【姓名】：{props.name},
      【性别】：{props.sex}
    </li>
  );
}

export default Student;
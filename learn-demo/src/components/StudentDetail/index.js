import React from 'react'

export default function StudentDetail(props) {
    return (
        <div>
            <h1>学生详情页面</h1>
            <h3>学号: {props.match.params.id}</h3>
        </div>
    )
}

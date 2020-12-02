import React, { Component } from 'react'
import Pager from './Pager'
import StudentList from './StudentList'

export default class PagerTest extends Component {
    state = {
        current: 1,
        total: 0,
        limit: 10,
        panelNumber: 5,
        students: []
    }
    constructor(props){
        super(props);
        this.fetchStudents();
    }

    async fetchStudents() {
        const resp = await fetch(`https://open.duyiedu.com/api/student/findByPage?appkey=demo13_1545210570249&page=${this.state.current}&size=${this.state.limit}`)
            .then(resp => resp.json())
            .then(resp => resp.data);

        this.setState({
            students: resp.findByPage, 
            total: resp.cont 
        })
    }
    handlePageChange = (newPage) => {
        this.setState({
            current: newPage
        })
        this.fetchStudents();
    }
    render() {
        return (
            <div className="container">
                <StudentList stus={this.state.students} />
                <div className="pager">
                    <Pager {...this.state} onPageChange={this.handlePageChange} />
                </div>
            </div>
        )
    }
}

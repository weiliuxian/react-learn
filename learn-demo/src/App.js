import React,{useState} from 'react'
import {SwitchTransition, TransitionGroup} from 'react-transition-group'
import FadeTransition from'./components/common/FadeTransition'
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  state = {
    show: true,
    tasks: [
      {
        id: uuidv4(),
        name: '任务1'
      },
      {
        id: uuidv4(),
        name: '任务2'
      },
      {
        id: uuidv4(),
        name: '任务3'
      }
    ]
  }
  render() {
    return (
      <div>
        <SwitchTransition>
          <FadeTransition appear key={this.state.show} timeout={500}>
            <h1>{this.state.show? '显示': '隐藏'}</h1>
          </FadeTransition>
        </SwitchTransition>
       
        <button onClick={()=> this.setState({
          show: !this.state.show
        })} style={{marginBottom: 100}}>切换显示状态</button>


        <TransitionGroup component="ul">
          {this.state.tasks.map(it =>  (
          <FadeTransition appear key={it.id} timeout={300}>
              <li>
                {it.name} 
                <button onClick={()=>{
                  this.setState({
                    tasks: this.state.tasks.filter(item => item.id !== it.id)
                  })
                }}>删除</button>
              </li>
          </FadeTransition>
          ) )}
        </TransitionGroup>
        <button onClick={()=>{
                var name = window.prompt('请输入任务名称')
                this.setState({
                  tasks: [...this.state.tasks, {id: uuidv4(), name}]
                })
              }}>添加</button>
      </div>
    )
  }
}

export default App
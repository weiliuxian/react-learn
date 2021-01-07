import React, { Component } from 'react'

const ctx = React.createContext({
    a: 0,
    b: 'abd'
})

const ctx2 = React.createContext()

function ChildA(props){

    return (
        <ctx2.Provider value={{
            a: 789,
            c: 'hello'
        }}>
            <div>
                <h1>ChildA</h1>
                <h2>
                    <ctx.Consumer>
                        {value => <>{value.a},{value.b}</>}
                    </ctx.Consumer>
                </h2>
                < ChildB ></ChildB>
            </div>
        </ctx2.Provider>

    )
}


class ChildB extends React.Component {
    // static contextType = ctx;
    render() {
        // return (<p>
        //     ChildB,来自与上下文的数据： a: {this.context.a}，b: {this.context.b}
        //     <button onClick={() => {
        //         this.context.onChange(this.context.a + 2)
        //     }}>后代组件的按钮，点击改变A+2</button>
        // </p>)
         return (
             <ctx.Consumer>
                 {value => (
                     <>
                     <p>
                        ChildB,来自与上下文的数据： a: {value.a}，b: {value.b}
                        <button onClick={() => {
                            value.onChange(value.a + 2)
                        }}>后代组件的按钮，点击改变A+2</button>
                    </p>
                    <p>
                        <ctx2.Consumer>
                            {val => (
                                <>
                                来自于ctx2的数据：a: {val.a}
                                </>
                            )}
                        </ctx2.Consumer>
                    </p>
                 </>
                 )}
             </ctx.Consumer>
         )
    }
}


export default class NewContext extends Component {
    state = {
        a:0,
        b: 'sgd',
        onChange: (newA) => {
            this.setState({
                a: newA
            })
        }
    }
    render() {
        const Provider = ctx.Provider
        return (
            <Provider value={this.state}>
                <div>
                    <ChildA />
                </div>
            </Provider>
        )
    }
}


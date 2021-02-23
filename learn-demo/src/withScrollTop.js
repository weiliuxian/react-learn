import React from 'react'

export default function widthScrollTop(Comp) {
    return class ScrollTopWrapper extends React.Component {
        componentDidMount() {
            window.scrollTo(0,0)
        }
        render() {
            return <Comp {...this.props} />
        }
    }
}
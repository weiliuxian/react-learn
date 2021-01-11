import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ctx from './formContext'

export default class FormInput extends Component {
    static contextType = ctx
    static defaultProps = {
        type: 'text'
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }

    render() {
        return (
            <input
                value={this.context.formData[this.props.name] || ""}
                type={this.props.type} 
                onChange={e => {
                    this.context.changeFormData(this.props.name,e.target.value)
                }}
            />
        )
    }
}

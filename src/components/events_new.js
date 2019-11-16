import React, { Component } from 'react';
import { connect } from 'react-redux'
import { postEvent } from '../actions'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onSubmit(values) {
    await this.props.postEvent(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field lable="Title" name="title" type="text" component={this.renderField} />
            <Field lable="Body" name="Body" type="text" component={this.renderField} />
          </div>

          <div>
            <input type="submit" value="Submit" disabled={false} />
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = ({ postEvent })

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please..."
  if (!values.body) errors.body = "Enter a body, please..."
  return errors
}

export default connect(null, mapDispatchToProps)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew))

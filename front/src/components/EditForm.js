import React, { Component } from 'react';

class EditForm extends Component {
  render() {
    console.log(this.props)
    return (
        <div>
            <h2>Edit Form</h2>
            <p>You can edit your transactions here</p>
        </div>
    )
  }
}

export default EditForm;
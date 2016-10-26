import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';

export default class PropertyForm extends Component {
  constructor() {
    super();
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const { name, email, phone } = this.refs;
    let clientPackage = {
      name: name.value,
      email: email.value,
      phone: phone.valuem,
    };
    console.log('ClientPackage: ', clientPackage);
    PropertyActions.createClient(clientPackage);
  }

  render() {
    return (
      <div>
        <form onSubmit={this._submitForm} className='form-inline'>
          <div className='form-group'>
            <input ref='name' type="text" className="form-control text-center" placeholder="Name"/>
            <input ref='email' type="text" className="form-control text-center" placeholder="email"/>
            <input ref='phone' type="text" className="form-control text-center" placeholder="phone"/>
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

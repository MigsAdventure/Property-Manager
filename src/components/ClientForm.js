import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';

export default class ClientForm extends Component {
  constructor() {
    super();
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const { name, email, phone, image } = this.refs;
    const clientPackage = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      image: image.value,
    };
    PropertyActions.createClient(clientPackage);
  }

  render() {
    return (
      <div>
        <form onSubmit={this._submitForm} className='form-inline'>
          <div>
            <input ref='name' type="text" className="text-center" placeholder="Name"/>
            <input ref='email' type="text" className="text-center" placeholder="Email"/>
            <input ref='phone' type="text" className="text-center" placeholder="Phone"/>
            <input ref='image' type="text" className="text-center" placeholder="Image url"/>
          </div>
          <button type='submit' className='btn btn-primary'>Create Client</button>
        </form>
      </div>
    );
  }
}

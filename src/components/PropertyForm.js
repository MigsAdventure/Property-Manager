import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';

export default class PropertyForm extends Component {
  constructor() {
    super();
    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm(e) {
    e.preventDefault();
    const { image, phone, address, rent } = this.refs;
    const propertyPackage = {
      image: image.value,
      phone: phone.value,
      address: address.value,
      rent: rent.value,
    };
    PropertyActions.createProperty(propertyPackage);
  }

  render() {
    return (
      <div>
        <form onSubmit={this._submitForm} className='form-inline'>
          <div>
            <input ref='phone' type="text" className="text-center" placeholder="Phone"/>
            <input ref='address' type="text" className="text-center" placeholder="Address"/>
            <input ref='rent' type="text" className="text-center" placeholder="Rent"/>
            <input ref='image' type="text" className="text-center" placeholder="Image url"/>
          </div>
          <button type='submit' className='btn btn-primary'>Create Property</button>
        </form>
      </div>
    );
  }
}

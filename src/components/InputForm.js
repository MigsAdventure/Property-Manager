import React, { Component } from 'react';

import ClientForm from './ClientForm';
import PropertyForm from './PropertyForm';

export default class InputForm extends Component {

  render() {
    return (
      <div>
        <div className='row'>
          <ClientForm />
        </div>
        <div className='row'>
          <PropertyForm />
        </div>
      </div>
    );
  }
}

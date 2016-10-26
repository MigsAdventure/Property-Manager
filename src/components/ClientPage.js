import React, { Component } from 'react';

import ClientForm from './ClientForm';
import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';

export default class ClientPage extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);

    this.state = {
      results: PropertyStore.getClients(),
    };
  }

  componentWillMount() {
    PropertyActions.getClients();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      results: PropertyStore.getClients(),
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <h2>Clients</h2>
        <h3>New Client</h3>
        <ClientForm />
      </div>
    );
  }

}

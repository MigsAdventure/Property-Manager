import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';
import Modal from './Modal';

export default class ClientsOverView extends Component {
  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
    this.viewClient = this.viewClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.state = {
      stats: PropertyStore.getStats(),
      client: null,
      name: null,
      email: null,
      phone: null,
    };
  }

  componentWillMount() {
    PropertyActions.getStats();
    PropertyStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      stats: PropertyStore.getStats(),
    });
  }

  viewClient(client) {
    console.log('client', client)
    this.setState({
      stats: PropertyStore.getStats(),
      client,
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
  }

  deleteClient(id) {
    PropertyActions.deleteClient(id);
  }

  render() {
    let { stats } = this.state || [];
    return (
      <div>
        <Modal client={this.state.client} properties={this.state.stats.properties} />
        {
          stats.clients.map((client) => {
            return (
              <div key={client._id} className='card' >
                <h3>{client.name}</h3>
                <img
                  src={client.image ||'http://glitch.news/wp-content/uploads/sites/19/2016/08/anon-troll.jpg' }
                  onClick={() => this.viewClient(client)}
                  data-toggle='modal'
                  data-target='#myModal'
                  alt=""
                  className="src"
                />
                <button className='btn btn-danger deleteBtn' onClick={() => this.deleteClient(client._id)} >X</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

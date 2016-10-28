import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';
import PropModal from './PropModal';

export default class PropertiesOverView extends Component {
  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
    this.viewProperty = this.viewProperty.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.state = {
      stats: PropertyStore.getStats(),
      property: null,
      address: null,
      rent: null,
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

  viewProperty(property) {
    this.setState({
      stats: PropertyStore.getStats(),
      property,
      name: property.name,
      email: property.email,
      phone: property.phone,
      rent: property.rent,
    });
  }

  deleteProperty(id) {
    PropertyActions.deleteProperty(id);
  }

  render() {
    let { stats } = this.state || [];
    return (
      <div>
        <PropModal clients={this.state.stats.clients} property={this.state.property} />
        {
          stats.properties.map((property) => {
            return (
              <div key={property._id} className='card' >
                <h3>${property.rent.replace(/[$]+/g, '')}</h3>
                <img
                  src={property.image ||'http://glitch.news/wp-content/uploads/sites/19/2016/08/anon-troll.jpg' }
                  onClick={() => this.viewProperty(property)}
                  data-toggle='modal'
                  data-target='#myModal'
                  alt=""
                />
                <button className='btn btn-danger deleteBtn' onClick={() => this.deleteProperty(property._id)} >X</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

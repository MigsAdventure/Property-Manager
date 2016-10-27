import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';
import ClientsOverView from './ClientsOverView';

export default class OverView extends Component {
  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
    this.state = {
      stats: PropertyStore.getStats(),
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

  render() {
    const { stats } = this.state;
    let rented = 0;
    let available = 0;
    let income = 0;
    stats.properties.forEach((property) => {
      property.clients.length !== 0 ? rented += 1 : available += 1;
      property.clients.length !== 0 ? income += parseFloat(property.rent.replace(/[$,]+/g, '')) : null;
    });
    return (
      <div>
        <h3>Total Clients: <span className='overviewTotal'>{stats.clients.length}</span></h3>
        <h3>Total Properties: <span className='overviewTotal'>{stats.properties.length}</span></h3>
        <h3>Total Rented Properties: <span className='overviewTotal'>{rented}</span> </h3>
        <h3>Total Available Properties: <span className='overviewTotal'>{available}</span> </h3>
        <h3>Income From Rented Properties: <span className='overviewTotal'>${income}</span> </h3>
      </div>
    );
  }
}

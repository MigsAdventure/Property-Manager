import React, {Component} from 'react';

import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';

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
    console.log('inside: ', stats)
    return (
      <div>

      </div>
    );
  }

}

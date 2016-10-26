import React, { Component } from 'react';
import socket from '../socket-init';

export default class Layout extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='container'>
        {this.props.children};
      </div>
    );
  }
}

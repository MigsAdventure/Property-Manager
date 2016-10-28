import React, { Component } from 'react';
import socket from '../socket-init';
import {Link} from 'react-router';
import classNames from 'classnames';
export default class Layout extends Component {
  constructor() {
    super();
  }


  render() {
        let path = this.props.location.pathname;
    return (
      <div>

        <ul className='nav nav-tabs'>
          <li role='presentation' className={classNames({ active: path === '/' })}>
            <Link to='/'>OverView</Link>
          </li>
          <li role='presentation' className={classNames({ active: path === '/form' })}>
            <Link to='/form'>Form</Link>
          </li>
          <li role='presentation' className={classNames({active: path === '/clients'})}>
            <Link to='/clients'>Clients</Link>
          </li>
          <li role='presentation' className={classNames({active: path === '/properties'})}>
            <Link to='/properties'>Properties</Link>
          </li>
        </ul>
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

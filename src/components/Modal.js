import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';

export default class Modal extends Component {
  constructor() {
    super();
  }

  changeForm() {
    var { name } = this.refs;
  }

  render() {
    let client = this.props.ClientInfo;

    return (
      <div>
        <div className={`modal fade bs-example-modal-md firstLevelModal`} tabIndex='-1' id='myModal' role='dialog' aria-labelledby='mySmallModalLabel'>
          <div className='modal-dialog modal-md secondLevelModal' role='document'>
            <div className='modal-content thirdLevelModal'>
              <div className='modalPicContainer fourthLevelModal' >
                <div className='clientInfoContainer'>
                  <h4 className='headings title'><b>Name: </b>{client.client.name}</h4>
                  <img src={client.client.image} role='presentation' />
                  <h4 className='headings title'><b>Phone: </b>{client.client.phone}</h4>
                  <h4 className='headings title'><b>Email: </b>{client.client.email}</h4>
                  <h4 className='headings title'><b>Address: </b>{client.client.email}</h4>
                </div>
                <div className='ownerContainer'>
                  <h3>Edit Client</h3>
                  <form onChange={this.changeForm.bind(this)}>
                    <input type='text' ref='name' placeholder='Name' value={client.client.name} />
                    <input type='text' ref='phone' placeholder='Phone' value={client.client.phone} />
                    <input type='text' ref='email' placeholder='Address' value={client.client.email} />
                  </form>
                </div>
                <button className='btn btn-primary' data-dismiss='modal'>Save</button>
                <button className='btn btn-success' data-dismiss='modal'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

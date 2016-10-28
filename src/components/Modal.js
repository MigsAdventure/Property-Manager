import React, { Component } from 'react';

import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.editValues = this.editValues.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.selectAddress = this.selectAddress.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = this.props;
  }


  componentWillMount() {
    PropertyStore.startListening(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.client !== this.state.client) {
      this.setState({
        client: nextProps.client,
        name: nextProps.client.name,
        email: nextProps.client.email,
        phone: nextProps.client.phone,
        id: nextProps.client._id,
        image: nextProps.client.image,
        selected: null,
      });
    }
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      selected: 'hi',
      // name: client.name,
      // phone: client.phone,
      // email: client.email,
      // address: client.address,
    });
  }


  saveEdit() {
    let { selected, name, email, phone, id, image } = this.state;
    let editPackage = {
      name,
      email,
      phone,
      image,
      id,
      selected,
    };
    console.log('editPackage', editPackage );
    PropertyActions.editClient(editPackage);
  }

  editValues() {
    let { editName, editEmail, editPhone } = this.refs;
    let { name, email, phone } = this.state;
    this.setState({
      name: editName.value,
      email: editEmail.value,
      phone: editPhone.value,
    });
  }

  selectAddress(e) {
    console.log(e.target);
    this.setState({
      selected: e.target.value,
    });
  }

  render() {
    // const client = this.state.client;
    let allProperties = this.state.properties|| [];
    let { name, email, phone, image, selected, id } = this.state || [];
    return (
      <div>
        <div
          className={`modal fade bs-example-modal-md firstLevelModal`}
          tabIndex='-1' id='myModal' role='dialog'
          aria-labelledby='mySmallModalLabel'
        >
          <div className='modal-dialog modal-md secondLevelModal' role='document'>
            <div className='modal-content thirdLevelModal'>
              <div className='modalPicContainer fourthLevelModal' >
                <div className='clientInfoContainer'>
                  <h4 className='headings title'><b>Name: </b>{name}</h4>
                  <img src={image || 'http://glitch.news/wp-content/uploads/sites/19/2016/08/anon-troll.jpg'}
                    role='presentation' />
                  <h4 className='headings title'><b>Phone: </b>{phone}</h4>
                  <h4 className='headings title'><b>Email: </b>{email}</h4>
                  <h4 className='headings title'><b>Address: </b>{selected}</h4>
                </div>
                <div className='optionsContainer'>
                  {/* <select name="" id=""> */}

                  <form>
                    <input list="addresses" name="address"/>
                    <datalist>
                      {
                        allProperties.map((prop) => {
                          return (
                            <option
                              onClick={() => this.setState({ selected: prop.address })}
                              onClick={(e) => this.selectAddress(e)}

                              value={prop.address}>{prop.address}
                            </option>
                          );
                        })
                      }
                    </datalist>
                    <input type="submit"/>
                  </form>

                  {/* </select> */}
                </div>

                <div className='editContainer'>
                  <h3>Edit Client</h3>
                  <form>
                    <input type='text' ref='editName' placeholder='Name' onChange={this.editValues} value={name} />
                    <input type='text' ref='editPhone' placeholder='Phone' onChange={this.editValues} value={phone} />
                    <input type='text' ref='editEmail' placeholder='Address' onChange={this.editValues} value={email} />
                  </form>
                </div>
                <button className='btn btn-primary' data-dismiss='modal' onClick={() => this.saveEdit()} >Save</button>
                <button className='btn btn-success' data-dismiss='modal'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

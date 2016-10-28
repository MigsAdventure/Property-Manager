import React, { Component } from 'react';

import uuid from 'uuid';
import PropertyActions from '../actions/PropertyActions';
import PropertyStore from '../stores/PropertyStore';

export default class PropModal extends Component {
  constructor(props) {
    super(props);
    this.editValues = this.editValues.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.selectClient = this.selectClient.bind(this);
    this.state = this.props;
  }


  componentWillMount() {
    PropertyStore.startListening(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.property !== this.state.property) {
      this.setState({
        property: nextProps.property,
        address: nextProps.property.address,
        rent: nextProps.property.rent,
        phone: nextProps.property.phone,
        id: nextProps.property._id,
        image: nextProps.property.image,
        selected: null,
      });
    }
  }

  componentWillUnmount() {
    PropertyStore.stopListening(this._onChange);
  }

  _onChange() {
    // this.setState({
    //   selected: '',
    //   address: property.address,
    //   phone: property.phone,
    //   rent: property.rent,
    //   address: property.address,
    // });
  }


  saveEdit() {
    let { selected, address, rent, phone, id, image } = this.state;
    let editPackage = {
      address,
      rent,
      phone,
      id,
      selected,
    };
    console.log('editPackage', editPackage );
    PropertyActions.editProperty(editPackage);
  }

  editValues() {
    let { editName, editRent, editPhone } = this.refs;
    let { address, rent, phone } = this.state;
    this.setState({
      address: editName.value,
      rent: editRent.value,
      phone: editPhone.value,
    });
  }

  selectClient(e) {
    this.setState({
      selected: e.target.value,
    });
  }

  render() {
    // const property = this.state.property;
    let allClients = this.state.clients|| [];
    console.log('TEST: ', this.state);
    let { address, rent, phone, image, selected, id } = this.state || [];
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
                <div className='propertyInfoContainer'>
                  <h4 className='headings title'><b>Address:<br/></b>{address}</h4>
                  <img src={image || 'http://glitch.news/wp-content/uploads/sites/19/2016/08/anon-troll.jpg'}
                    role='presentation' />
                  <h4 className='headings title'><b>Phone: </b>{phone}</h4>
                  <h4 className='headings title'><b>Rent: </b>{rent}</h4>
                </div>
                <div className='optionsContainer'>
                  <select>
                    {
                      allClients.map((person) => {
                        return (
                          <option key={uuid()}
                            onChange={() => this.setState({ selected: person.name })}
                            // onClick={(e) => this.selectClient(e)}

                            value={person.name}>{person.name}
                          </option>
                        );
                      })
                    }
                  </select>
                </div>

                <div className='editContainer'>
                  <h3>Edit Property</h3>
                  <form>
                    <input type='text' ref='editName' placeholder='Name' onChange={this.editValues} value={address} />
                    <input type='text' ref='editPhone' placeholder='Phone' onChange={this.editValues} value={phone} />
                    <input type='text' ref='editRent' placeholder='Address' onChange={this.editValues} value={rent} />
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

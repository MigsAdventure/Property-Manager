process.env.NODE_ENV = 'test'; // cheap way to change node environment to what we want

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../appTest');

const { expect } = chai;
const Property = require('../models/Property');

chai.use(chaiHttp);

describe('API routes', () => {
  // describe('GET /', () => {
  //   it('should respond with HTML', () => {
  //     return chai.request(app)
  //     .get('/')
  //     .then((res) => {
  //       console.log('res:', res);
  //       expect(res).to.have.status(200);
  //     });
  //   });
  // });
  describe('/api/properties', () => {

    beforeEach(() => {
      // empty data from db
      return Property.remove({})
      // add some sample data
      .then(() => {
        return Property.create({
          address: '21308 Harbor View Ave, Long Beach, CA 90810',
          image: 'http://google.com',
          phone: '562-606-3563',
          rent: '$434,343,034.43',
          // clients: [{ type: Schema.Types.ObjectId, ref: 'Person', max: 5 }],
        });
      });
    });

    describe('GET', () => {
      it('should respond with an array of properties', () => {
        return chai.request(app)
        .get('/api/properties')
        .then((res) => {
          console.log('res222:', res.body);
          const properties = res.body;
          expect(res).to.have.status(200);
          expect(properties).to.have.length(1);
          expect(properties[0].address).to.equal('21308 Harbor View Ave, Long Beach, CA 90810');
        });
      });
    });

    describe('POST', () => {
      let newProperty = {
        address: '21308 Harbor View Ave, Long Beach, CA 90810',
        image: 'http://google.com',
        phone: '562-606-3563',
        rent: '$434,343,034.43',
      }
      it('should respond with a new Object', () => {
        return chai.request(app)
        .post('/api/properties')
        .send(newProperty)
        .then((res) => {
          // res.send(newProperty);
          console.log('res.body', res.body);
          const properties = res.body;
          expect(res).to.have.status(200);
          expect(properties).to.have.property('address');
          expect(properties).to.have.property('rent');
          expect(properties).to.have.property('phone');
          expect(properties).to.have.property('image');
          expect(properties.address).to.equal('21308 Harbor View Ave, Long Beach, CA 90810');
        });
      });
    });
  });
});

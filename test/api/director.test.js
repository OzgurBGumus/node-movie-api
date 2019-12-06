const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

let token;
let _id;
chai.use(chaiHttp);
describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Authenticate Test', ()=>{
  before((done)=>{
    chai.request(server)
      .post('/authenticate')
      .send({username:'BozgurGumus', password:'12345678'})
      .end((err,res)=>{
        token = res.body.token;
        done();
      });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/GET /directors Test', ()=>{
    it('Done', (done)=>{
      chai.request(server)
        .get('/api/directors')
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/POST /directors Test', ()=>{
    it('Done.', (done) =>{
      chai.request(server)
        .post('/api/directors')
        .send({name: 'DirectorTestName', surname: 'DirectorTestSurname', bio: 'DirectorTestBio'})
        .set('x-access-token', token)
        .end((err,res)=>{
          _id = res.body._id;
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('name').eql('DirectorTestName');
          res.body.should.have.property('surname').eql('DirectorTestSurname');
          res.body.should.have.property('bio').eql('DirectorTestBio');
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/GET/:_id /directors Test', ()=>{
    it('Done.', (done)=>{
      chai.request(server)
        .get('/api/directors/'+_id)
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.should.be.a('object');
          /*res.should.have.property('name');
          res.should.have.property('surname');
          res.should.have.property('bio');*/
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/DELETE/:_id /directors Test', ()=>{
    it('Done.', (done)=>{
      chai.request(server)
        .delete('/api/directors/'+_id)
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.should.be.a('object');
          res.should.have.property('status');
          done();
        });

    });
  });
});

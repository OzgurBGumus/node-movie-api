const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

let token;
let temp_Movie_id;

chai.use(chaiHttp);
describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Authenticate Test', () =>{
  before((done)=>{
    chai.request(server)
      .post('/authenticate')
      .send({username:'BozgurGumus', password:'12345678'})
      .end((err, res) =>{
        token = res.body.token;
        //console.log(token);
        done();
      });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/GET /movies Test', () =>{
    it('Done.', (done) =>{
      chai.request(server)
        .get('/api/movies')
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/POST /movies Test', () =>{
    it('Done.', (done)=>{
      const movie = {
        title:'Udemy',
        director_id:'5de452f1d0ec6446a48a1b25',
        imdb_score:10,
        category:'Sci-Fi',
        country:'USA',
        year:2020
      };

      chai.request(server)
        .post('/api/movies')
        .send(movie)
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('imdb_score');
          res.body.should.have.property('category');
          res.body.should.have.property('country');
          res.body.should.have.property('year');
          temp_Movie_id=res.body._id;
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/GET /movies/Top10 Test', () =>{
    it('Done.',(done) =>{
      chai.request(server)
        .get('/api/movies/top10')
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/GET/:_id /movies Test', () =>{
    it('Done.', (done) =>{
      chai.request(server)
        .get('/api/movies/'+ temp_Movie_id)
        .set('x-access-token', token)
        .end((err,res) =>{
          res.should.have.status(200);
          res.should.be.a('object');
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/PUT/:_id /movies Test', () =>{
    it('Done.', (done)=>{
      const movie = {
        title:'UpdateTest',
        director_id:'5de452f1d0ec6446a48a1b25',
        imdb_score:3,
        category:'Horror',
        country:'Germany',
        year:2013
      };

      chai.request(server)
        .put('/api/movies/'+temp_Movie_id)
        .send(movie)
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('director_id').eql(movie.director_id);
          res.body.should.have.property('imdb_score').eql(movie.imdb_score);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('year').eql(movie.year);
          done();
        });
    });
  });
  describe('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/DELETE/:_id /movies Test', () =>{
    it('Done.', (done) =>{
      chai.request(server)
        .delete('/api/movies/'+temp_Movie_id)
        .set('x-access-token', token)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })
    });
  });


});

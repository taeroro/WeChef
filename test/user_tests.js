let mongoose = require('mongoose');
let chai = require('chai');
let sleep = require('sleep');
let server = require('../server');
let chaiHttp = require('chai-http');
let User = require('../app/models/user');
let uuid = require('uuid/v1');
let faker = require('faker');
let should = chai.should();

chai.use(chaiHttp);

describe('User', function() {

    let create_valid_user = () => {
        let valid_user = {
            userName: faker.internet.userName(),
            facebookID: uuid(),
            email: faker.internet.email(),
            userImageURL: faker.internet.url(),
        };
        return valid_user;
    }
    let user_list = [];

    this.timeout(400000);

    // Setup for tests

    before(done => {

        User.remove({}, err => {

            for(let i = 0; i < 20; i++) {
                user_list.push(create_valid_user());
            }

            User.insertMany(user_list, (err, users) => {
                done();
            });
        });
    });

    // Get a new token before each test for both webUI and user roles

    beforeEach(done => {
        done();
    });

    // Remove all users after tests are completed

    after(done => {

        User.remove({}, err => {
            done();
        });
    });

    describe('/POST User SignUp', () => {
        
        it('it should reject with no username provided', done => {
            let user = create_valid_user();
            delete user.userName;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject with no facebookID provided', done => {
            let user = create_valid_user();
            delete user.facebookID;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        })

        it('it should reject with no userImageURL provided', done => {
            let user = create_valid_user();
            delete user.userImageURL;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject with invalid email provided', done => {
            let user = create_valid_user();
            user.email = 'aaaaaaa';

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject with invalid email provided', done => {
            let user = create_valid_user();
            user.email = 12345;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        })

        it('it should reject with duplicated email provided', done => {
            let user = create_valid_user();
            user.email = user_list[0].email;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

        it('it should reject with duplicated facebookID provided', done => {
            let user = create_valid_user();
            user.facebookID = user_list[0].facebookID;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

        it('it should reject with duplicated Image URL provided', done => {
            let user = create_valid_user();
            user.userImageURL = user_list[0].userImageURL;

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

        it('it should succeed with valid information', done => {
            let user = create_valid_user();

            chai.request(server)
                .post('/user/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    User.findOne({ facebookID: user.facebookID, }, (err, user2) => {
                        user2.userName.should.be.eql(user.userName);
                        user2.userImageURL.should.be.eql(user.userImageURL);
                        user2.email.should.be.eql(user.email);
                        done();
                    });
                });
        });
    });

    describe('/PUT User Profile.', () => {

        it('it should reject with facebookID that has not been registered', done => {
            let user = create_valid_user();

            chai.request(server)
                .put('/user/profile/' + user.facebookID)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should reject with invalid email provided', done => {
            let user = create_valid_user();
            user.email = 'aaaaaaa';

            chai.request(server)
                .put('/user/profile/' + user_list[0].facebookID)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject with invalid email provided', done => {
            let user = create_valid_user();
            user.email = 12345;

            chai.request(server)
                .put('/user/profile/' + user_list[0].facebookID)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject with duplicated email provided', done => {
            let user = create_valid_user();
            user.email = user_list[1].email;

            chai.request(server)
                .put('/user/profile/' + user_list[0].facebookID)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(409);
                    done();
                });
        });

        it('it should succeed with valid information', done => {
            let user = create_valid_user();

            chai.request(server)
                .put('/user/profile/' + user_list[0].facebookID)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    User.findOne({ facebookID: user_list[0].facebookID, }, (err, user2) => {
                        user2.userName.should.be.eql(user.userName);
                        user2.email.should.be.eql(user.email);
                        done();
                    });
                });
        });

        it('it should succeed with empty information', done => {

            chai.request(server)
                .put('/user/profile/' + user_list[0].facebookID)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    });

    describe('/GET User by facebookID', () => {

        it('it should reject with facebookID that has not been registered', done => {
            let user = create_valid_user();
            chai.request(server)
                .get('/user/' + user.facebookID)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should succeed with valid information', done => {

            chai.request(server)
                .get('/user/' + user_list[1].facebookID)
                .end((err, res) => {
                    res.should.have.status(200);
                    User.findOne({ facebookID: user_list[1].facebookID, }, (err, user2) => {
                        user2.userName.should.be.eql(user_list[1].userName);
                        user2.userImageURL.should.be.eql(user_list[1].userImageURL);
                        user2.email.should.be.eql(user_list[1].email);
                        done();
                    });
                });
        });

    });

    describe('/GET User Login', () => {

        it('it should reject with facebookID that has not been registered', done => {
            let user = create_valid_user();
            chai.request(server)
                .get('/user/login/' + user.facebookID)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should succeed with valid information', done => {

            chai.request(server)
                .get('/user/login/' + user_list[1].facebookID)
                .end((err, res) => {
                    res.should.have.status(200);
                    User.findOne({ facebookID: user_list[1].facebookID, }, (err, user2) => {
                        user2.userName.should.be.eql(user_list[1].userName);
                        user2.userImageURL.should.be.eql(user_list[1].userImageURL);
                        user2.email.should.be.eql(user_list[1].email);
                        done();
                    });
                });
        });

    });

});
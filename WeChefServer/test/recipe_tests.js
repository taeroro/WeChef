let mongoose = require('mongoose');
let chai = require('chai');
let sleep = require('sleep');
let server = require('../server');
let chaiHttp = require('chai-http');
let Recipe = require('../app/models/recipe');
let User = require('../app/models/user');
let uuid = require('uuid/v1');
let faker = require('faker');
let should = chai.should();

chai.use(chaiHttp);

describe('Recipe', function() {


    let create_valid_user = () => {
        let valid_user = {
            userName: faker.internet.userName(),
            facebookID: uuid(),
            email: faker.internet.email(),
            userImageURL: faker.internet.url(),
        };
        return valid_user;
    }

    let create_valid_recipe = (facebookID) => {
        let valid_recipe = {
            title: faker.commerce.productName(),
            ownerID: facebookID,
            recipeImageURL: faker.internet.url(),
            userImageURL: faker.internet.url(),
            difficulty: faker.random.number(),
            favoriteCount: faker.random.number(),
            ingredients: [{'name': 'tomato', 'amount': '1count'}],
        };
        return valid_recipe;
    }
    let recipe_list = [];

    this.timeout(400000);

    // Setup for tests_id_id_id

    before(done => {

        Recipe.deleteMany({}, err => {

            for(let i = 0; i < 10; i++) {
                recipe_list.push(create_valid_recipe());
            }

            Recipe.insertMany(recipe_list, (err, recipes) => {
                done();
            });
        });
    });

    // Get a new token before each test for both webUI and user roles

    beforeEach(done => {
        done();
    });

    // Remove all recipes after tests are completed

    after(done => {

        Recipe.deleteMany({}, err => {
            done();
        });
    });

    describe('/POST Recipe Creation', () => {

        it('it should reject with no ownerID provided', done => {
            let valid_user = create_valid_user();
            let recipe = create_valid_recipe('na');
            delete recipe.ownerID;

            chai.request(server)
                .post('/recipe/create')
                .send(recipe)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should reject with no title provided', done => {
            let valid_user = create_valid_user();
            let recipe = create_valid_recipe(valid_user.facebookID);
            delete recipe.title;

            User.create(valid_user, (err, res) => {
                chai.request(server)
                    .post('/recipe/create')
                    .send(recipe)
                    .end((err, res) => {
                        res.should.have.status(422);
                        done();
                    });
            })

        });

        it('it should reject without ingredient name provided', done => {
            
            let valid_user = create_valid_user();
            let recipe = create_valid_recipe(valid_user.facebookID);
            delete recipe.ingredients[0]['name'];

            User.create(valid_user, (err, res) => {
                chai.request(server)
                    .post('/recipe/create')
                    .send(recipe)
                    .end((err, res) => {
                        res.should.have.status(422);
                        done();
                    });
            })
            
        });

        it('it should reject without ingredient amount provided', done => {

            let valid_user = create_valid_user();
            let recipe = create_valid_recipe(valid_user.facebookID);
            delete recipe.ingredients[0]['amount'];
            
            User.create(valid_user, (err, res) => {
                chai.request(server)
                    .post('/recipe/create')
                    .send(recipe)
                    .end((err, res) => {
                        res.should.have.status(422);
                        done();
                    });
            })
            
        });

        it('it should succeed with valid information', done => {
            let valid_user = create_valid_user();
            let recipe = create_valid_recipe(valid_user.facebookID);
            
            User.create(valid_user, (err, res) => {
                chai.request(server)
                    .post('/recipe/create')
                    .send(recipe)
                    .end((err, res) => {
                        res.should.have.status(201);
                        done();
                    });
            })
        });
      });

    describe('/GET Recipe by ID', () => {


        it('it should reject an invalid ID', done => {

            chai.request(server)
                .get('/recipe/recipe-byid/' + 'invalid')
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject an ID that is not created', done => {

            chai.request(server)
                .get('/recipe/recipe-byid/' + mongoose.Types.ObjectId())
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should accept with a valid recipe id', done => {
            let recipe = create_valid_recipe('anyID');

            Recipe.create(recipe, (err, recipe2) => {
                chai.request(server)
                    .get('/recipe/recipe-byid/' + recipe2._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
                });
        });
    });

    describe('/GET Recipe by Owner ID', () => {

        it('it should reject an owner ID that does not exists', done => {

            chai.request(server)
                .get('/recipe/by-owner/' + 'invalid')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should accept with a valid recipe id', done => {
            let valid_user = create_valid_user('anyID');

            User.create(valid_user, (err, user) => {
                chai.request(server)
                    .get('/recipe/by-owner/' + valid_user.facebookID)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.eql([])
                        done();
                    });
                });

        });
    });
});

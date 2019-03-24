let mongoose = require('mongoose');
let chai = require('chai');
let sleep = require('sleep');
let server = require('../server');
let chaiHttp = require('chai-http');
let Recipe = require('../app/models/recipe');
let uuid = require('uuid/v1');
let faker = require('faker');
let should = chai.should();

chai.use(chaiHttp);

describe('Recipe', function() {

    let create_valid_recipe = () => {
        let valid_recipe = {
            title: faker.commerce.productName(),
            ownerID: uuid(),
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

    // Setup for tests

    before(done => {

        Recipe.remove({}, err => {

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

        Recipe.remove({}, err => {
            done();
        });
    });

    describe('/POST Recipe Creation', () => {

        it('it should reject with no ownerID provided', done => {
            let recipe = create_valid_recipe();
            delete recipe.ownerID;

            chai.request(server)
                .post('/recipe/create')
                .send(recipe)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject with no title provided', done => {
            let recipe = create_valid_recipe();
            delete recipe.title;

            chai.request(server)
                .post('/recipe/create')
                .send(recipe)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject without ingredient name provided', done => {
            let recipe = create_valid_recipe();
            delete recipe.ingredients[0]['name'];

            chai.request(server)
                .post('/recipe/create')
                .send(recipe)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should reject without ingredient amount provided', done => {
            let recipe = create_valid_recipe();
            delete recipe.ingredients[0]['amount'];

            chai.request(server)
                .post('/recipe/create')
                .send(recipe)
                .end((err, res) => {
                    res.should.have.status(422);
                    done();
                });
        });

        it('it should succeed with valid information', done => {
            let recipe = create_valid_recipe();

            chai.request(server)
                .post('/recipe/create')
                .send(recipe)
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
      });

      describe('/GET Recipe by ID', () => {

          it('it should reject an ID that is not created', done => {
              let recipe = create_valid_recipe();

              chai.request(server)
                  .post('/recipe/' + recipe._id)
                  .send(recipe)
                  .end((err, res) => {
                      res.should.have.status(404);
                      done();
                  });
          });
        });
});

let express = require('express');
let mongoose = require('mongoose');
let cloudinary = require('cloudinary');
let Recipe = require('../models/recipe');
let QAndA = require('../models/QAndA');
let Review = require('../models/review');
let User = require('../models/user');
let ImageUpload = require('../middlewares/image_parser')
//let Transaction = require('mongoose-transactions');

let recipeRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// see my recipes
recipeRouter.get('/by-owner/:facebookID', (req, res, err) => {

    let fbID = req.params.facebookID;
    if (!fbID) {
        return res.status(422).send({
            message: 'No FacebookID provided.',
        });
    }

    Recipe.find({ ownerID: fbID, }, '_id title recipeImageURL difficulty', (err, recipes) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (recipes) {
            res.status(200).send(recipes);
        } else {
            return res.status(404).send({
                message: 'No recipes for the given user id.',
            });
        }
    });

});

// get one recipe
recipeRouter.get('/recipe-byid/:recipeID', (req, res, err) => {

    Recipe.findById(req.params.recipeID, (err, recipe) => {
        if (err){

            return res.status(500).send({
                message: err,
            });
        }
        if (recipe) {
            res.status(200).send(recipe);
        } else {
            return res.status(404).send({
                message: 'No recipe exists with given id.',
            });
        }
    });

});

/**
 * search recipe by keywords
 * pass in whatever inside the search bar
 * like: "blueburry cheesecake",
 * tokenization is handleded internally.
 */
recipeRouter.get('/search', (req, res, err) => {
    if (!req.query.keywords) {
        return res.status(422).send({
            message: 'No keywords provided.',
        });
    }
    /**
     * $text will tokenize the search string using whitespace and most punctuation
     * as delimiters, and perform a logical OR of all such tokens in the search string.
     */
    Recipe.find({ '$text': { '$search': req.query.keywords, }},
        { score: { '$meta': 'textScore', }})
        .sort({ 'score': { '$meta': 'textScore', }})
        .exec( (err, recipes) => {
            if (err) {
                return res.status(500).send({
                    message: err,
                });
            }
            // use res.json as the list might be empty
            res.json(recipes);
        });
});

// create recipe
recipeRouter.post('/create', ImageUpload.recipeImageUpload, (req, res, err) => {
    let new_recipe = new Recipe();
    new_recipe.title = req.body.title;
    new_recipe.ownerID = req.body.ownerID;
    new_recipe.content = req.body.content;
    new_recipe.ingredients = req.body.ingredients;
    new_recipe.difficulty = req.body.difficulty ? req.body.difficulty : 0 ;
    if (req.file) {
      new_recipe.recipeImageURL = req.file.url;
      new_recipe.recipeImageID = req.file.public_id;
    }

    new_recipe.save((err, recipe) => {
      if (err) {
        if (new_recipe.recipeImageID) {
          cloudinary.v2.api.delete_resources(new_recipe.recipeImageID);
        }
        if (err.name === 'ValidationError') {
            return res.status(422).send({
                message: err.errors,
            });
        } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
            return res.status(409).send({
                message: 'This recipe has already been created.',
            });
        } else {
            return res.status(500).send({
                message: err,
            });
        }
      }
      return res.status(201).send({
          message: 'OK',
          recipeID: new_recipe._id,
          recipeImage: new_recipe.recipeImageURL
      });
    })
});

// edit recipe
recipeRouter.put('/edit/:recipeID', ImageUpload.recipeImageUpload, (req, res, err) => {

    Recipe.findById(req.params.recipeID, (err, recipe) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (recipe) {
            recipe.title = req.body.title;
            recipe.content = req.body.content || [];
            recipe.ingredients = req.body.ingredients || [];
            recipe.difficulty = req.body.difficulty;
            let prevImage = recipe.recipeImageID;

            if (req.file) {
              recipe.recipeImageURL = req.file.url;
              recipe.recipeImageID = req.file.public_id;
            }

            recipe.save((err, recipe2) => {
                if (err) {
                    if (err.name === 'ValidationError') {
                        return res.status(422).send({
                            message: err.errors,
                        });
                    } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
                        return res.status(409).send({
                            message: 'Violated value unique.',
                        });
                    } else {
                        return res.status(500).send({
                            errorType: 'InternalError',
                            message: err,
                        });
                    }
                }
                if (req.file && prevImage) {
                    cloudinary.v2.api.delete_resources([ prevImage, ]);
                }
                return res.status(200).send({
                    message: 'OK',
                });
            });
        } else {
            return res.status(404).send({
                message: 'No recipe exists with given recipeID.',
            });
        }
    });

});

// get all recipe for home page, sort by date
recipeRouter.get('/homepage', (req, res, err) => {

    Recipe.find({}, '_id title recipeImageURL difficulty', {sort: { updatedAt: -1 }}, (err, recipes) => {
      if (err){
          return res.status(500).send({
              message: err,
          });
      }
      if (recipes) {
          res.status(200).send(recipes);
      } else {
          return res.status(404).send({
              message: 'No recipes can be found.',
          });
      }
    });
});

// get my fav recipes
recipeRouter.get('/:facebookID/favourite', (req, res, err) => {
    User.findOne({ facebookID: req.params.facebookID }, (err, user) => {
      const favouriteRecipeIDs = user.favoriteRecipeIDs;
      Recipe.find({ _id: {$in: favouriteRecipeIDs} }, (err, recipes) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (recipes) {
            res.status(200).send(recipes);
        } else {
            return res.status(404).send({
                message: 'No recipes can be found.',
            });
        }
      })
    })
});

// Add Q&A to a recipe
recipeRouter.post('/qa/create/:recipeID', (req, res, err) => {
    let new_qAndA = new QAndA();
    new_qAndA.qContent = req.body.qContent;
    new_qAndA.qRecipeIDs = req.params.recipeID;
    new_qAndA.qOwnerID = req.body.qOwnerID;
    console.log(new_qAndA.qContent);
    console.log(new_qAndA.qRecipeIDs);
    console.log(new_qAndA.qOwnerID);

    new_qAndA.save((error, qAndA) => {
      if (error) {
        if (err.name === 'ValidationError') {
            return res.status(422).send({
                message: err.errors,
            });
        } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
            return res.status(409).send({
                message: 'This Q and A has already been created.',
            });
        } else {
            return res.status(500).send({
                message: err,
            });
        }
      }
      return res.status(201).send({
          message: 'OK',
          qAndA: qAndA,
      });
    })
});

// Get Q and A's of a recipe
recipeRouter.get('/qa/:recipeID', (req, res, err) => {
    let recipeID = req.params.recipeID;

    if (!recipeID) {
        return res.status(422).send({
            message: 'No recipeID provided.',
        });
    }

    QAndA.find({qRecipeIDs: recipeID}, {}, {sort: { createdAt: -1 }}, (err, qAndAs) => {
      if (err){
          console.log(err);
          return res.status(500).send({
              message: err,
          });
      }
      if (qAndAs) {
          res.status(200).send(qAndAs);
      } else {
          return res.status(404).send({
              message: 'No qAndAs for the given recipe id.',
          });
      }
    });
});

// Get the latest Q and A of a recipe
recipeRouter.get('/qa/first/:recipeID', (req, res, err) => {
    let recipeID = req.params.recipeID;

    if (!recipeID) {
        return res.status(422).send({
            message: 'No recipeID provided.',
        });
    }

    QAndA.find({qRecipeIDs: recipeID}, {}, {sort: { createdAt: -1 }, limit: 1}, (err, qAndA) => {
      if (err){
          return res.status(500).send({
              message: err,
          });
      }
      if (qAndA) {
          res.status(200).send(qAndA);
      } else {
          return res.status(404).send({
              message: 'No qAndAs for the given recipe id.',
          });
      }
    });
});

// Update the Q and A
recipeRouter.put('/qa/answer/:QnAID', (req, res, err) => {
      QAndA.findById(req.params.QnAID, (err, qna) => {
        if (err) {
            return res.status(500).send({
                message: err,
            });
        }
        if (qna) {
            qna.aContent = req.body.aContent;
            qna.save((err, qna2) => {
              if (err) {
                  if (err.name === 'ValidationError') {
                      return res.status(422).send({
                          message: err.errors,
                      });
                  } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
                      return res.status(409).send({
                          message: 'Violated value unique.',
                      });
                  } else {
                      return res.status(500).send({
                          errorType: 'InternalError',
                          message: err,
                      });
                  }
              }
              return res.status(200).send({
                  message: 'OK',
              });
            })
        } else {
            return res.status(404).send({
                message: 'No QnA exists with given QnAID.',
            });
        }
      })
})

module.exports = recipeRouter;

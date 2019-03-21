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

    Recipe.find({ ownerID: fbID, }, (err, recipes) => {
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
recipeRouter.get('/:recipeID', (req, res, err) => {

    Recipe.findByID( recipeID, (err, recipe) => {
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
    /*
    if (!req.file || !req.file.url || !req.file.public_id) {
        return res.status(500).send({
            message: 'Internal error in uploading images.',
        });
    }
    User.findOne({ facebookID: req.params.facebookID, }, (err, user) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (user) {
            let prevImage = user.userImageID;

            user.userImageURL = req.file.url;
            user.userImageID = req.file.public_id;

            user.save((err, user2) => {
                if (err) {

                    cloudinary.v2.api.delete_resources([ user.userImageID, ]);

                    if (err.name === 'ValidationError') {
                        return res.status(422).send({
                            message: err.errors,
                        });
                    } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
                        return res.status(409).send({
                            message: 'This Imge has already been used.',
                        });
                    } else {
                        return res.status(500).send({
                            errorType: 'InternalError',
                            message: err,
                        });
                    }
                }
                if (prevImage) {
                    cloudinary.v2.api.delete_resources([ prevImage, ]);
                }
                return res.status(200).send({
                    userImageURL: user.userImageURL,
                });
            });
        } else {
            return res.status(404).send({
                message: 'No user exists with given facebookID.',
            });
        }
    });
    */

});

// update recipe
recipeRouter.put('/:recipeID', ImageUpload.userPhotoUpload, (req, res, err) => {
    /*
    if (!req.file || !req.file.url || !req.file.public_id) {
        return res.status(500).send({
            message: 'Internal error in uploading images.',
        });
    }
    User.findOne({ facebookID: req.params.facebookID, }, (err, user) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (user) {
            let prevImage = user.userImageID;

            user.userImageURL = req.file.url;
            user.userImageID = req.file.public_id;

            user.save((err, user2) => {
                if (err) {

                    cloudinary.v2.api.delete_resources([ user.userImageID, ]);

                    if (err.name === 'ValidationError') {
                        return res.status(422).send({
                            message: err.errors,
                        });
                    } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
                        return res.status(409).send({
                            message: 'This Imge has already been used.',
                        });
                    } else {
                        return res.status(500).send({
                            errorType: 'InternalError',
                            message: err,
                        });
                    }
                }
                if (prevImage) {
                    cloudinary.v2.api.delete_resources([ prevImage, ]);
                }
                return res.status(200).send({
                    userImageURL: user.userImageURL,
                });
            });
        } else {
            return res.status(404).send({
                message: 'No user exists with given facebookID.',
            });
        }
    });
    */

});

// get all recipe limit 10 for home page, sort by date
recipeRouter.get('/homepage', (req, res, err) => {});

// get my fav recipes
recipeRouter.get('/:facebookID/favourite', (req, res, err) => {});



module.exports = recipeRouter;

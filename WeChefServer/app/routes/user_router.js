let express = require('express');
let mongoose = require('mongoose');
let cloudinary = require('cloudinary');
let User = require('../models/user');
let ImageUpload = require('../middlewares/image_parser')
//let Transaction = require('mongoose-transactions');

let userRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

userRouter.get('/login/:facebookID', (req, res, err) => {

    let fbID = req.params.facebookID;
    if (!fbID) {
        return res.status(422).send({
            message: 'No FacebookID provided for login.',
        });
    }

    User.findOne({ facebookID: fbID, }, (err, user) => {
        if (err){

            return res.status(500).send({
                message: err,
            });
        }
        if (user) {
            res.status(200).send(user);
        } else {
            return res.status(404).send({
                message: 'No user exists with given FacebookID.',
            });
        }
    });

});

userRouter.get('/:facebookID', (req, res, err) => {

    User.findOne({ facebookID: req.params.facebookID, }, (err, user) => {
        if (err){

            return res.status(500).send({
                message: err,
            });
        }
        if (user) {
            res.status(200).send(user);
        } else {
            return res.status(404).send({
                message: 'No user exists with given id.',
            });
        }
    });

});

userRouter.post('/signup', (req, res, err) => {
    let new_user = new User();
    new_user.userName = req.body.userName;
    new_user.facebookID = req.body.facebookID;
    new_user.email = req.body.email;
    new_user.userImageURL = req.body.userImageURL;
    new_user.age = req.body.age;
    new_user.gender = req.body.gender;

    new_user.save((err, user) => {
        if (err) {
            if (err.name === 'ValidationError') {
                return res.status(422).send({
                    message: err.errors,
                });
            } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
                console.log(err);
                return res.status(409).send({
                    message: 'This FacebookID/Email has already been registered.',
                });
            } else {
                return res.status(500).send({
                    errorType: 'InternalError',
                    message: err,
                });
            }
        }

        return res.status(201).send({
            message: 'OK',
        });
    });

});

userRouter.put('/profile/:facebookID', (req, res, err) => {
    if ('facebookID' in req.body) {
        return res.status(403).send({
            message: 'Permission denied: changing facebookID.',
        });
    }

    User.findOne({ facebookID: req.params.facebookID, }, (err, user) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (user) {

            user.userName = req.body.userName || user.userName;
            user.email = req.body.email || user.email;
            user.age = req.body.age || user.age;
            user.gender = req.body.gender || user.gender;
            
            user.save((err, user2) => {
                if (err) {
                    if (err.name === 'ValidationError') {
                        return res.status(422).send({
                            message: err.errors,
                        });
                    } else if (err.name === 'BulkWriteError' || err.name === 'MongoError') {
                        return res.status(409).send({
                            message: 'This Email has already been registered.',
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
            });
        } else {
            return res.status(404).send({
                message: 'No user exists with given facebookID.',
            });
        }
    });

});

userRouter.put('/photo/:facebookID', ImageUpload.userPhotoUpload, (req, res, err) => {

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

});

module.exports = userRouter;

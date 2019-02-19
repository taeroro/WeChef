let express = require('express');
let mongoose = require('mongoose');
let User = require('../models/user');
let Transaction = require('mongoose-transactions');

let userRouter = express.Router();

userRouter.get('/login/:facebookID', (req, res, err) => {

    let fbID = req.params.facebookID;
    if (!fbID) {
        return res.status(422).send({
            message: 'No FacebookID provided for login.',
        });
    }

    User.findOne({ fbID: facebookID, }, (err, user) => {
        if (err){

            return res.status(500).send({
                message: err,
            });
        }
        if (user) {
            res.status(200).send({
                userID: user._id,
            });
        } else {
            return res.status(404).send({
                message: 'No user exists with given FacebookID.',
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
                return res.status(409).send({
                    message: 'This FacebookID/Email has already benen registered.',
                });
            } else {
                return res.status(500).send({
                    errorType: 'InternalError',
                    message: err,
                });
            }
        }

        return res.status(201).send({
            userID: user._id,
        });
    });

});

userRouter.put('/profile/:userID', (req, res, err) => {
    if ('facebookID' in req.body) {
        return res.status(403).send({
            message: 'Permission denied: changing facebookID.',
        });
    }

    User.findById(req.path.userID, (err, user) => {
        if (err){
            return res.status(500).send({
                message: err,
            });
        }
        if (user) {
            if (user.facebookID !== req.headers.facebookID) {
                return res.status(403).send({
                    message: 'Permission denied: changing profile of other user.',
                });
            }

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
                            message: 'This FacebookID/Email has already benen registered.',
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
                message: 'No user exists with given userID.',
            });
        }
    });

});
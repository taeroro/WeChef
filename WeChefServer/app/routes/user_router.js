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

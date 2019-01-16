const uuidv4 = require('uuid/v4');
const User = require('../models/user');
const StreamKey = require('../models/streamKey');
const mongoose = require('mongoose');

exports.streamKey_generate = (req, res, next) => {
    StreamKey.find({userId: req.body.userId})
    .exec()
    .then(streamKey =>{
        if(streamKey.length >= 1){
            return res.status(409).json({
                message: "El usuario ya posee un Stream Key"
            })
        } else {
            User.findById(req.body.userId)
            .then(user => {
                if(!user){
                    return res.status(404).json({
                        message: 'User not found'
                    })
                }
                const key = uuidv4();
                const streamKey = new StreamKey({
                    _id: mongoose.Types.ObjectId(),
                    userId: req.body.userId,
                    key: key
                })
                return streamKey.save();
            }).then(result => {
                res.status(201).json({
                    message: 'StreamKey stored'
                })
            }).catch(err => {
                res.status(500).json({
                    message: 'User not found',
                    error: err
                })
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            message: 'User not found'
        })
    });   
}

exports.get_streamkey = (req, res, next) => {
    StreamKey.find({userId: req.params.userId})
    .select('key')
    .exec()
    .then(streamKey => {
        if(streamKey){
            res.status(200).json({
                key: streamKey[0].key
            })
        } else {
            res.status(404).json({
                message: 'There is no Stream Key for the user'
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

exports.get_all_streamkeys = (req, res, next) => {
    StreamKey.find()
    .select('userId key')
    .exec()
    .then(streamKey => {
        res.status(200).json({
            key: streamKey
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}



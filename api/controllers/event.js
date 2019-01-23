const Event = require('../models/event')
const mongoose = require('mongoose')

exports.event_create = (req, res, next) => {
    const event = new Event({
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        initialDate: req.body.initialDate,
        finalDate: req.body.finalDate,
        metadata: {
            title: req.body.metadata.title,
            description: req.body.metadata.description,
            subject: req.body.metadata.subject,
            language: req.body.metadata.language,
            rights: req.body.metadata.rights,
            license: req.body.metadata.license,
            seriesid: req.body.metadata.seriesid,
            presenter: req.body.metadata.presenter,
            contributor: req.body.metadata.contributor
        },
        streamType: req.body.streamType
    })
    event.save(function (err){
        if(err) return err
        return res.status(201).json({
            message:"Event Created"
        })
    })
}

exports.event_get_all_user = (req, res, next) => {
    Event.find({userId: req.body.userId})
    .select('initialDate finalDate metadata.title')
    .exec()
    .then(event => {
        res.status(200).json({
            events: event
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Algo anduvo mal!',
            error: err
        })
    })
}

exports.event_delete = (req, res, next) => {
    Event.remove({_id: req.body.id})
    .exec()
    .then(()=>{
        res.status(200).json({
            message: 'Event deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}
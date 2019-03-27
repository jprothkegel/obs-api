const Event = require('../models/event')
const mongoose = require('mongoose')

exports.event_create = (req, res, next) => {
    const event = new Event({
        _id: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        initialDate: req.body.initialDate,
        finalDate: req.body.finalDate,
        metadata: {
            flavor: "dublincore/episode",
            fields: [
                {
                    id:"title",
                    value: req.body.metadata.title
                },
                {
                    id: "description",
                    value: req.body.metadata.description
                },
                {
                    id: "language",
                    value: req.body.metadata.language
                },
                {
                    id: "license",
                    value: req.body.metadata.license
                },
                {
                    id: "creator",
                    value: req.body.metadata.creator
                },
                {
                    id: "contributor",
                    value: req.body.metadata.contributor
                }
            ]
        },
        streamType: req.body.streamType,
        location: req.body.location
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
    .select('initialDate finalDate metadata.fields')
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

exports.event_get_all_location = (req, res, next) => {
    Event.find({location: req.body.location})
    .select('metadata initialDate finalDate streamType')
    .exec()
    .then(event =>{
        res.status(200).json({
            events: event
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Algo anduvo mal!',
            error: err
        })
    })
}

exports.event_get_by_id = (req, res, next) => {
    Event.findById(req.params.eventId)
    .select('metadata initialDate finalDate streamType')
    .exec()
    .then(event => {
        res.status(200).json({
            event: event
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Algo andudo mal!',
            error: err
        })
    })
}
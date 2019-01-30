const StreamKey = require('../models/streamKey')
const Video = require('../models/video')
const mongoose = require('mongoose')

exports.video_create = (req, res, next) => {
    Video.find({streamKeyId: req.body.streamKeyData})
    .exec()
    .then(video => {
        if(video.length >= 1){
            return res.status(409).json({
                message: "Esta Stream Key ya está siendo usada"
            })
        } else {
            StreamKey.findById(req.body.streamKeyData)
            .then(streamKey => {
                if(!streamKey){
                    return res.status(404).json({
                        message: 'Stream Key no existe'
                    })
                }

                let today = new Date
                let dd = today.getDate()
                let mm = today.getMonth() +1
                let yyyy = today.getFullYear()
                let hours = today.getHours()
                let minutes = today.getMinutes()
                let seconds = today.getSeconds()
                if(dd<10){
                    dd = '0'+dd;
                }
                if(mm<10){
                    mm = '0'+mm
                }
                if(hours<10){
                    hours = '0'+hours
                }
                if(minutes<10){
                    minutes = '0'+minutes
                }
                if(seconds<10){
                    seconds = '0'+seconds
                }
                today = yyyy+'-'+mm+'-'+dd+' '+hours+'-'+minutes+'-'+seconds

                const video = new Video({
                    _id: mongoose.Types.ObjectId(),
                    userId: streamKey.userId,
                    streamKeyId: req.body.streamKeyData,
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
                    date: today,
                    status: req.body.status
                })
                return video.save();
            }).then(result => {
                res.status(201).json({
                    message: 'El vídeo ha sido creado'
                })
            }).catch(err=>{
                console.log(err)
                res.status(404).json({
                    message: 'El vídeo no se pudo crear',
                    error: err
                })
            })
        }
    })
    .catch(err => {
        res.status(404).json({
            message: 'Algo anduvo mal'
        })
    })
}

exports.video_get_all = (req, res, next) => {
    Video.find({status:'Active'})
    .select('streamKeyId _id metadata.title date')
    .exec()
    .then(video => {
        res.status(200).json({
            videos: video
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
}

exports.video_get = (req, res, next) => {
    Video.findById(req.params.videoId)
    .select('streamKeyId')
    .then(video => {
        StreamKey.findById(video.streamKeyId)
        .select('key')
        .then(result => {
            res.status(200).json({
                streamKey: result
            })
        })
        .catch(err => {
            console.log(err)
        })        
    })
    .catch(err => {
        res.status(500).json({
            message: "Algo ha ido mal!",
            error:err
        })
    })
}

exports.video_delete = (req, res , next) => {
    Video.remove({streamKeyId: req.body.streamKeyId})
    .exec()
    .then(video => {
        res.status(200).json({
            message: 'Video deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.video_change_status = (req, res, next) => {
    Video.update({streamKeyId:req.body.id},{status:'Inactive'})
    .exec()
    .then(resp => {
        res.status(200).json({
            message: 'Estado vídeo actualizado'
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}
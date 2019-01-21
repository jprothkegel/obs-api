const StreamKey = require('../models/streamKey')
const Video = require('../models/video')
const mongoose = require('mongoose')

exports.video_create = (req, res, next) => {
    Video.find({streamKeyId: req.body.video.streamKeyData})
    .exec()
    .then(video => {
        if(video.length >= 1){
            return res.status(409).json({
                message: "Esta Stream Key ya está siendo usada"
            })
        } else {
            StreamKey.findById(req.body.video.streamKeyData)
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
                if(dd<10){
                    dd = '0'+dd;
                }
                if(mm<10){
                    mm = '0'+mm
                }
                today = mm+'/'+dd+'/'+yyyy

                const video = new Video({
                    _id: mongoose.Types.ObjectId(),
                    userId: streamKey.userId,
                    streamKeyId: req.body.video.streamKeyData,
                    title: req.body.video.title,
                    date: today
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
    Video.find()
    .select('streamKeyId _id title date')
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
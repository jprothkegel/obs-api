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

                creator = req.body.metadata.creator
                console.log(creator)
                const video = new Video({
                    _id: mongoose.Types.ObjectId(),
                    userId: streamKey.userId,
                    streamKeyId: req.body.streamKeyData,
                    metadata: {
                        flavor: "dublincore/episode",
                        fields: [
                            {
                                id: "title",
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
                    date: today,
                    status: req.body.status,
                    streamType: req.body.streamType
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
    .select('streamKeyId _id metadata.fields date')
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
    Video.deleteOne({id: req.body.streamKeyId})
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

exports.get_inactive_videos = (req, res, next)=> {
    Video.find({status:'Inactive'}).limit(1).sort({$natural: -1})
    .select('metadata')
    .exec()
    .then(resp => {
        res.status(200).json({
            message: resp
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
}
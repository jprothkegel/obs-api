const OBSWebSocket = require('obs-websocket-js');
const User = require ('../models/user');
const StreamKey = require('../models/streamKey');
const obs = new OBSWebSocket();

exports.obs_connect = (req, res, next) => {
    obs.connect({address: 'localhost:4444'})
    .then(()=>{
        return res.status(200).json({
            message: 'Conexión exitosa',
            estado: 'Conectado'
        })
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({
            error: err
        })
    });
}

exports.obs_start_streaming = (req, res, next) => {
    StreamKey.find({userId: req.body.userId})
    .select('key')
    .exec()
    .then(streamKey => {
        if(streamKey.length > 1){
            return res.status(409).json({
                message: "User can't have more than one Stream Key"
            })
        } else {
            obs.send('StartStreaming',{
                'stream': {
                    'settings':{
                        'key': streamKey[0].key
                    }
                }
            })
            .then(()=>{
                return res.status(200).json({
                    message: 'Streaming started correctly'
                })
            })
            .catch(err=>{
                console.log(err)
                return res.status(500).json({
                    error: err,
                    message: 'Not connected to Socket'
                })
            })
        }
        
    })
    .catch(err => {
        return res.status(500).json({
            message: 'The user has no Stream Key',
            error: err
        })
    })
    
}

exports.obs_stop_streaming = (req, res, next) => {
    obs.send('StopStreaming')
    .then(()=>{
        return res.status(200).json({
            message: 'Streaming stopped correctly'
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({
            error: err,
            message: 'No está conectado'
        })
    })
}

exports.obs_start_recording = (req, res, next) => {
    obs.send('StartRecording')
    .then(() => {
        return res.status(200).json({
            message: 'Recording started correctly'
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err,
            message: 'No está conectado'
        })
    })
}

exports.obs_stop_recording = (req, res, next) => {
    obs.send('StopRecording')
    .then(()=>{
        return res.status(200).json({
            message: 'Recording stopped correctly'
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err,
            message: 'No está conectado'
        })
    })
}

exports.obs_start_streaming_recording = (req, res, next) => {
    StreamKey.find({userId: req.body.userId})
    .select('key')
    .exec()
    .then(streamKey => {
        if(streamKey.length > 1){
            return res.status(409).json({
                message: "User can't have more the one Stream Key"
            })
        } else {
            obs.send('StartStreaming', {
                'stream': {
                    'settings':{
                        'key': streamKey[0].key
                    }
                }
            })
            .then(()=>{
                obs.send('StartRecording')
                .then(()=>{
                    return res.status(200).json({
                        message: 'Streaming and Recording started correctly'
                    })
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        error: err,
                        message: 'No está conectado'
                    })
                })
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    error: err,
                    message: 'No está conectado'
                })
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            message: 'The user has no stream Key',
            error: err
        })
    })
    
}

exports.obs_stop_streaming_recording = (req, res, next) => {
    obs.send('StopStreaming')
    .then(()=>{
        obs.send('StopRecording')
        .then(()=>{
            return res.status(200).json({
                message: 'Streaming and Recording stopped correctly'
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err,
                message: 'No está conectado'
            })
        })
    })
    .catch(err => {
        console.log(err);
        
    })
}

exports.obs_get_streaming_status = (req, res, next) => {
    obs.send('GetStreamingStatus')
    .then(status=>{
        return res.status(200).json({
            message: status.status
        })
    })
}

exports.obs_get_version = (req, res, next) => {
    obs.send('GetVersion')
    .then(status => {
        return res.status(200).json({
            message: status
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err,
            estado: 'No conectado'
        })
    })
}
const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

exports.obs_connect = (req, res, next) => {
    obs.connect({address: 'localhost:4444'})
    .then(()=>{
        console.log('Connection completed')
        return res.status(200).json({
            message: 'All was good'
        })
    }).catch(err=>{
        console.log(err)
        return res.status(500).json({
            error: err
        })
    });
}

exports.obs_start_streaming = (req, res, next) => {
    obs.send('StartStreaming',{'stream.settings.key': 'test2'})
    .then(()=>{
        return res.status(200).json({
            message: 'Streaming started correctly'
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

exports.obs_stop_streaming = (req, res, next) => {
    obs.send('StopStreaming')
    .then(()=>{
        console.log('Streaming stopped correctly');
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
        console.log('Recording started correctly');
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
        console.log('Recording stopped correctly');
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
    obs.send('StartStreaming', {
        'stream.settings.key': req.body.streamKey
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
        console.log(status)
        return res.status(200).json({
            message: status.status
        })
    })
}
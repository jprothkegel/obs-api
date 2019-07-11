const axios = require('axios')

var baseUrl = 'http://192.168.0.67:8080'
var user = 'admin'
var password = 'opencast'
var base64encodedData = new Buffer(user + ':' + password).toString('base64')

exports.get_ondemand_videos = (req, res, next) => {
  axios({
      url: baseUrl + '/api/events/',
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + base64encodedData
      }
    })
    .then(resp => {
      const videos = []
      resp.data.forEach(function(arrayItem) {
        if(arrayItem.status === 'EVENTS.EVENTS.STATUS.PROCESSED'){
          videos.push({
            id: arrayItem.identifier,
            title: arrayItem.title,
            contributor: arrayItem.contributor
          })
        }
      })
      res.status(200).json({
        message: "Funciono",
        videos: videos
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "No funciono"
      })
    })
}

exports.get_ondemand_link = (req, res, next) => {
  var eventId = req.body.eventId
  axios({
      url: baseUrl + '/api/events/' + eventId + '/publications',
      method: 'get',
      headers: {
        'Authorization': 'Basic ' + base64encodedData
      }
    })
    .then(resp => {
      let videoUrlArray = []
      let duration = ''
      for(let i in resp.data[1].attachments){
        if(resp.data[1].attachments[i].flavor === 'presenter/search+preview' || resp.data[1].attachments[i].flavor === 'presentation/search+preview'){
          previewUrl = resp.data[1].attachments[i].url
        }
      }
      for(let j in resp.data[1].media){
        videoUrlArray.push({
          "flavor": resp.data[1].media[j].flavor,
          "url": resp.data[1].media[j].url
        })
        duration = resp.data[1].media[j].duration
        console.log(resp.data[1].media[j].duration)
      }
      videoUrl = resp.data[1].media[0].url
      res.status(200).json({
        message: {
          videoUrl: videoUrl,
          previewUrl: previewUrl,
          id: req.body.eventId,
          videoUrlArray: videoUrlArray,
          duration: duration
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "No funciono"
      })
    })
}

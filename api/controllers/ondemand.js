const axios = require('axios')

var baseUrl = 'http://192.168.1.230:8080'
var user = 'admin'
var password = 'opencast'
var base64encodedData = new Buffer(user + ':' + password).toString('base64')

exports.get_ondemand_videos = (req, res, next) => {
  console.log(base64encodedData)
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
        videos.push({
          id: arrayItem.identifier,
          title: arrayItem.title,
          contributor: arrayItem.contributor
        })

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
        'Authorization': 'Basic YWRtaW46b3BlbmNhc3Q='
      }
    })
    .then(resp => {
      for(let i in resp.data[1].attachments){
        if(resp.data[1].attachments[i].flavor === 'presenter/search+preview'){
          previewUrl = resp.data[1].attachments[i].url
        }
      }
      videoUrl = resp.data[1].media[0].url
      res.status(200).json({
        message: {
          videoUrl: videoUrl,
          previewUrl: previewUrl,
          id: req.body.eventId
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        message: "No funciono"
      })
    })
}

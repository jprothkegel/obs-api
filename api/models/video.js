const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    streamKeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'StreamKey', required:true},
    title: { type: String, required:true},
    date: { type:String , required:true}
})

module.exports = mongoose.model('Video', videoSchema)
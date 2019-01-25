const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    streamKeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'StreamKey', required:true},
    metadata: {
        title: { type: String, required:true},
        description: { type:String },
        subject: { type:String },
        language: {type: String },
        rights: { type: String },
        license: { type: String },
        seriesid: { type: String},
        presenter: { type: String },
        contributor: {type: String}
    },
    date: { type:String , required:true},
    status: { type:String, required:true}
})

module.exports = mongoose.model('Video', videoSchema)
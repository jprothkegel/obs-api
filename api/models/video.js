const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    streamKeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'StreamKey', required:true},
    metadata: {
        flavor: {type: String},
        fields: [
            {
                id: {type: String},
                value: {type: String, required: true}
            },
            {
                id: {type: String},
                value: {type: String}
            },
            {
                id: {type: String},
                value: {type: String}
            },
            {
                id: {type: String},
                value: {type: String}
            },
            {
                id: {type: String},
                value:{type: Array}
            },
            {
                id: {type: String},
                value:{type: Array}
            }
        ]
    },
    date: { type:String , required:true},
    status: { type:String, required:true},
    streamType: {type:String, required:true}
})

module.exports = mongoose.model('Video', videoSchema)
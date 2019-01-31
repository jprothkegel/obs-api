const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    initialDate: {type:String, required:true},
    finalDate: {type:String, required:true},
    metadata: {
        title: {type:String,required:true},
        description: {type:String},
        subject: {type:String},
        language: {type:String},
        rights: {type:String},
        license: {type:String},
        seriesid: {type:String},
        presenter: {type: String},
        contributor: {type: String}
    },
    streamType: {type:String, required: true},
    location:{type: String, required: true}
})

module.exports = mongoose.model('Event', eventSchema)
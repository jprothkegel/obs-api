const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    initialDate: {type:String, required:true},
    finalDate: {type:String, required:true},
    metadata: {
        flavor: { type:String },
        fields: [
            {
                id: {type:String},
                value: {type:String, required:true}
            },
            {
                id: {type:String},
                value:{type: String}
            },
            {
                id: {type:String},
                value:{type: String}
            },
            {
                id: {type:String},
                value:{type: String}
            },
            {
                id: {type:String},
                value:{type: Array}
            },
            {
                id: {type:String},
                value:{type: Array}
            },

        ]
    },
    streamType: {type:String, required: true},
    location:{type: String, required: true}
})

module.exports = mongoose.model('Event', eventSchema)
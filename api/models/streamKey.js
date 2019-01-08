const mongoose = require('mongoose');

const streamKeySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    key: {type:String, required:true}
})

module.exports = mongoose.model('StreamKey', streamKeySchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bodyweight: {
        type: Number,
        required: true
    },
    performedLifts: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Lift'
        }
    ]
    
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const liftSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    lifter: {
        type: Schema.Types.ObjectID,
        ref: 'User'
    }
});

module.exports = mongoose.model('Lift', liftSchema);
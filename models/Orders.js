const mongoose = require('mongoose')

const { Schema } = mongoose;

const OderSchema = new Schema ({
    email: {
        type: String,
        required : true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model('order',OderSchema)
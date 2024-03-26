const mongoose = require('mongoose');
const SchoolScheme = mongoose.Schema({
    name: {
        type:String,
    }
})

const School = mongoose.model('truonghoc', SchoolScheme);
module.exports = School;
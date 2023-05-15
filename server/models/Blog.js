const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const BlogSchema = new Schema({
    title: String,
    author: String,
    imageUrl: String,
    content: String,
    quote: String
}, {
    timestamps: true,
});

const BlogModel = model('Blog', BlogSchema);

module.exports = BlogModel;
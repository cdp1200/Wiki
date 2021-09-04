const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    id: Schema.Types.ObjectId,
    title: String,
    description: String,
    author: String,
    createdAt: String,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
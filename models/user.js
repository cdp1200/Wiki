const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    username: String,
    password: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
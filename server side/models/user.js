const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String, default: "https://www.flaticon.com/free-icon/user_149071" },
}, { timestamp: true })

const User = mongoose.model("User", userSchema);
module.exports = User;
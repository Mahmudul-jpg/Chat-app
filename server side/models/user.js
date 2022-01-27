const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String, required: true, default: "https://www.flaticon.com/free-icon/user_149071" },
}, { timestamp: true })

const User = mongoose.model("User", userSchema);
module.exports = User;
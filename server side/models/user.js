const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String, default: "https://www.flaticon.com/free-icon/user_149071" },
}, { timestamp: true }
)
userSchema.methods.tiePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);
module.exports = User;
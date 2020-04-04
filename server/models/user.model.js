const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    },
  },
  password: String,
})

UserSchema.methods.comparePassword = (inputPassword) => bcrypt.compareSync(inputPassword, this.password);

UserSchema.pre("save", next => {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 10)

  return next()
})

module.exports = mongoose.model("User", UserSchema)
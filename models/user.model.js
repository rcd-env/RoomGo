const { Schema, model } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //   username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //   },
    //   password: {
    //     type: String,
    //     required: true,
    //     min: 8,
    //   },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

module.exports = model("User", userSchema);

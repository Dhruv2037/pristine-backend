const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: false,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    
    service: {
      type: String,
      required: [true, "Please add your service"],
    },
    phone: {
      type: Number,
      required: [true, "Please add your phone"],
      validate: {
        validator: function (v) {
          // Check if the phone number has exactly 10 digits
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
      }
    },
    message : {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: String,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
    //number of tickets bought
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
    // createdAt: { type: Date, expires: "90d", default: Date.now()},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

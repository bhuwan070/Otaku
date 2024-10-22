const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    // rulebook: {
    //   type: String,
    //   required: true,
    // },
    formUrl: {
      type: String,
    },
    whatsappUrl: {
      type: String,
    },
    isActive: {
      //for verifying if the event is expired or not
      type: Boolean,
      default: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    ticketSold: {
      type: Number,
      default: 0,
    },
    // createdAt: { type: Date, expires: "120d", default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

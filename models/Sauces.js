const mongoose = require("mongoose");

const saucesSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  // likes: { type: Number, required: true },
  // dislikes: { type: Number, required: true },
  // usersLiked: { type: Array, required: true },
  // usersDisliked: { type: Array, required: true },
});

module.exports = mongoose.model("Sauces", saucesSchema);
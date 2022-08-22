//importation package mongoose
const mongoose = require("mongoose");

//donnée pour la sauces
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Sauce", sauceSchema);

/*
{
  "userId":"",
  "name":"bananne",
  "manufacturer":"bannane",
  "description":"banane",
  "mainPepper":"bababa",
  "heat":0,
  "imageUrl":"",
  "likes":0,
  "dislikes":0,
  "usersLiked":[],
  "usersDisliked":[]
}
*/

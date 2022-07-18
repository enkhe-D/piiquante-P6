// const Sauce = require("../models/Sauce");

// exports.userLike = (req, res, next) => {
//   console.log("----------req.body---like-------");
//   console.log(req.body);

// Sauce.findOne({ _id: req.params.id });
// console
//   .log(objetSauce)
//   .then((objetSauce) => {
//     if (
//       !objetSauce.userLiked.includes(req.body.userId) &&
//       req.body.lik === 1
//     ) {
//       console.log("les instrucation qui seront executé");
//     } else {
//       console.log("false");
//     }
//   })
//   .catch((error) => res.status(404).json({ error }));
//};

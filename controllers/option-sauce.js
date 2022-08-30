const Sauce = require("../models/Sauce");

// controller pour le like d une sauce + ajout de l userId dans le tableau usersLiked
exports.userLike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauceObjet) => {
      if (
        !sauceObjet.usersLiked.includes(req.body.userId) &&
        req.body.like === 1
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() => res.status(201).json({ message: "liked" }))
          .catch((error) => res.status(400).json({ error }));
      }

      // enlever le like et retire le userId du tableau usersLiked
      if (
        sauceObjet.usersLiked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          }
        )
          .then(() =>
            res.status(200).json({ message: "Option désélectionnée" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

      // controller pour le dislike d une sauce + ajout de le userId du tableau usersDisliked
      if (
        !sauceObjet.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() => res.status(200).json({ message: "disliked" }))
          .catch((error) => res.status(400).json({ error }));
      }

      // enlever le dislikes et retire le userId du tableau usersDisliked
      if (
        sauceObjet.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res.status(200).json({ message: "Option désélectionnée" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

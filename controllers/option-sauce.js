const Sauce = require("../models/Sauce");

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
          .then(() => res.status(200).json({ message: "liked" }))
          .catch((error) => res.status(400).json({ error }));
      }

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
            res
              .status(200)
              .json({ message: "Vous ne savez pas si vous aimez ou pas" })
          )
          .catch((error) => res.status(400).json({ error }));
      }

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
          .then(() => res.status(200).json({ message: "bha compteur a 0" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

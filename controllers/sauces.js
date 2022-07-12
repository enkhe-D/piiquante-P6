const Sauce = require("../models/Sauce");
const fs = require("fs");
const bodyParser = require("body-parser");

exports.createSauce = (req, res, next) => {
  const objetSauce = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    ...objetSauce,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce enregistré", contenu: req.body });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.createSauce = (req, res, next) => {
//   const sauce = new Sauce({
//     ...req.body,
//   });
//   sauce
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Sauce enregistré", contenu: req.body });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

exports.readAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.readOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.upDateOneSauce = (req, res, next) => {
  const objetSauce = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete objetSauce._userId;
  Sauce.findOne({ _id: res.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Action non autorisé" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...objetSauce, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.upDateOneSauce = (req, res, next) => {
//   Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() =>
//       res.status(201).json({ message: "Objet modifié", contenu: req.body })
//     )
//     .catch((error) => res.status(400).json({ error }));
// };

exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Action non autorisé" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.deleteOneSauce = (req, res, next) => {
//   Sauce.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet supprimé" }))
//     .catch((error) => res.status(400).json({ error }));
// };

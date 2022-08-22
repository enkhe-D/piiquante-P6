const Sauce = require("../models/Sauce");
const fs = require("fs");

/////// CONTROLLER CREATE SAUCES
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  if (sauce.userId !== req.auth.userId) {
    return res.status(400).json({ error: "Création pas autorisé" });
  } else {
    sauce
      .save()
      .then(() => {
        res.status(201).json({ message: "Sauce créée et enregistrée" });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};

/////// CONTROLLER ALL SAUCES
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

/////// CONTROLLER UPDATE ONE SAUCE
exports.updateSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((updateSaucObejct) => {
      if (updateSaucObejct.userId !== req.auth.userId) {
        return res.status(400).json({ error: "Modification pas autorisé" });
      } else {
        if (req.file) {
          Sauce.findOne({ _id: req.params.id })
            .then((sauceObjectImage) => {
              const filename = sauceObjectImage.imageUrl.split("/images/")[1];
              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
                console.log("IMAGE MODIFIÉE");
              });
            })
            .catch((error) => res.status(400).json({ error }));
        } else {
          console.log("erreur");
        }

        const sauceObject = req.file
          ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };

        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => res.status(401).json({ error }));
};

/////// CONTROLLER DELETE ONE SAUCE
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((deleteSauce) => {
      if (deleteSauce.userId !== req.auth.userId) {
        return res.status(401).json({ error: "Suppression non autorisée !" });
      } else {
        const filename = deleteSauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce supprimée" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

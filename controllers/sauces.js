const Sauce = require("../models/Sauce");
const fs = require("fs");

/////// CONTROLLER CREATE SAUCES
exports.createSauce = (req, res, next) => {
  //    const createNewSauce = JSON.parse(req.body.sauce);

  //   const sauce = new Sauce({
  //     ...createNewSauce,
  //     imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //       req.file.filename
  //     }`,
  //   });

  //   userIdParamsUrl = req.originalUrl.split("=")[1];

  //   console.log("-----------------");
  //   console.log(req.body.userId);

  //   if (req.body.userId && req.body.userId === userIdParamsUrl.userId) {
  //     sauce
  //       .save()
  //       .then(() => {
  //         res.status(201).json({ message: "Sauce créée et enregistrée" });
  //       })
  //       .catch((error) => {
  //         res.status(400).json({ error });
  //       });
  //   } else {
  //     throw "creation impossible";
  //   }
  // };

  // const sauceObjet = JSON.parse(req.body.sauce);
  // const sauce = new Sauce({
  //   ...sauceObjet,
  //   imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //     req.file.filename
  //   }`,
  // });

  // if (sauce.userId !== req.auth.userId) {
  //   return res.status(403).json({ error: "Requête non autorisée !" });
  // } else {
  //   sauce
  //     .save()
  //     .then(() => {
  //       res.status(201).json({ message: "Sauce créée et enregistrée" });
  //     })
  //     .catch((error) => {
  //       res.status(400).json({ error });
  //     });
  // }

  const sauceObjet = req.body;
  const sauce = new Sauce({
    ...sauceObjet,
  });
  sauce
    .save()
    .then(() =>
      res.status(201).json({ message: "Sauce enregistrée", contenu: req.body })
    )
    .catch((error) => res.status(400).json({ error }));
};

/////// CONTROLLER ALL SAUCES
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((read) => {
      res.status(200).json(read);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((readOne) => res.status(200).json(readOne))
    .catch((error) => res.status(400).json({ error }));
};

/////// CONTROLLER UPDATE ONE SAUCE
exports.updateSauce = (req, res, next) => {
  // if (req.file) {
  //   Sauce.findOne({ _id: req.params.id })
  //     .then((updateImage) => {
  //       const filename = updateImage.imageUrl.split("/images/")[1];
  //       fs.unlink(`images/${filename}`, (error) => {
  //         if (error) throw error;
  //         console.log("IMAGE MODIFIÉE");
  //       });
  //     })
  //     .catch((error) => res.status(400).json({ error }));
  // } else {
  //   console.log("klkc ne marche pas");
  // }
  // const updateOneSauce = req.file
  //   ? {
  //       ...JSON.parse(req.body.sauce),
  //       imageUrl: `${req.protocol}://${req.get("host")}/images/${
  //         req.file.filename
  //       }`,
  //     }
  //   : { ...req.body };
  // Sauce.updateOne(
  //   { _id: req.params.id },
  //   { ...updateOneSauce, id: req.params.id }
  // )
  //   .then(() =>
  //     res.status(200).json({ message: "Sauce modifiée", contenu: req.body })
  //   )
  //   .catch((error) => res.status(404).json({ error }));

  //modification qui seront envoyé dans la base de donnée
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

/////// CONTROLLER DELETE ONE SAUCE
exports.deleteSauce = (req, res, next) => {
  // Sauce.findOne({ _id: req.params.id })
  //   .then((deleteOneSauce) => {
  //     if (deleteOneSauce.userId !== req.auth.userId) {
  //       return res.status(403).json({ error: "Requête non autorisée !" });
  //     } else {
  //       const filename = deleteOneSauce.imageUrl.split("/images/")[1];
  //       fs.unlink(`images/${filename}`, () => {
  //         Sauce.deleteOne({ _id: req.params.id })
  //           .then(() => res.status(200).json({ message: "Sauce supprimée" }))
  //           .catch((error) => res.status(400).json({ error }));
  //       });
  //     }
  //   })
  //   .catch((error) => res.status(400).json({ error }));

  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimée" }))
    .catch((error) => res.status(400).json({ error }));
};

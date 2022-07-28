const Sauce = require("../models/Sauce");
const fs = require("fs");

// CONTROLLER CREATE SAUCES
exports.createSauces = (req, res, next) => {
  const createNewSauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...createNewSauce,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce créée et enregistrée" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// //CONTROLLER ALL SAUCES
exports.readAllSauces = (req, res, next) => {
  Sauce.find()
    .then((readAllSauces) => {
      res.status(200).json(readAllSauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.readOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((readOneSauce) => res.status(200).json(readOneSauce))
    .catch((error) => res.status(400).json({ error }));
};

// /////// CONTROLLER UPDATE ONE SAUCE
exports.updateOneSauce = (req, res, next) => {
  console.log("------ req.file updateimage ----------");
  console.log(req.file);

  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((updateImage) => {
        const filename = updateImage.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
          console.log("IMAGE MODIFIÉE");
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    console.log("klkc ne marche pas");
  }

  const updateOneSauce = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.updateOne(
    { _id: req.params.id },
    { ...updateOneSauce, id: req.params.id }
  )
    .then(() =>
      res.status(200).json({ message: "Sauce modifiée", contenu: req.body })
    )
    .catch((error) => res.status(404).json({ error }));
};

/////// CONTROLLER DELETE ONE SAUCE
exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((deleteOneSauce) => {
      const filename = deleteOneSauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

// exports.updateOneFicheSauce = (req, res, next) => {
//   const ficheSauce = req.file
//     ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   delete ficheSauce._userId;
//   Sauce.findOne({ _id: req.params.id })
//     .then((sauce) => {
//       if (sauce.userId != req.auth.userId) {
//         res.status(401).json({ message: "action non autorisée" });
//       } else {
//         Sauce.updateOne(
//           { _id: req.params.id },
//           { ...ficheSauce, _id: req.params.id }
//         )
//           .then(() => res.status(200).json({ message: "Sauce modifié" }))
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => res.status(400).json({ error }));
// };

// exports.deleteOneFicheSauce = (req, res, next) => {
//   Sauce.findOne({ _id: req.params.id })
//     .then((sauce) => {
//       if (sauce.userId != req.auth.userId) {
//         res.status(401).json({ message: "Action non autorisée" });
//       } else {
//         const filename = sauce.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {
//           Sauce.deleteOne({ _id: req.params.id })
//             .then(() => res.status(200).json({ message: "Sauce supprimée" }))
//             .catch((error) => res.status(400).json({ error }));
//         });
//       }
//     })
//     .catch((error) => res.status(400).json({ error }));
// };

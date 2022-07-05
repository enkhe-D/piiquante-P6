const Sauces = require("../models/Sauces");
const fs = require("fs");
const { json } = require("body-parser");

/////// CONTROLLER CREATE SAUCE
// exports.createSauces = (req, res, next) => {
//   const sauceObjet = JSON.parse(req.body.Sauces);
//   const sauce = new Sauces({
//     ...sauceObjet,
//     userId: req.auth.userId,
//     imageUrl: `${req.protocol}://${req.get("host")}/images/${
//       req.file.filename
//     }`,
//   });

//   sauce
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Sauce enregistré" });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

exports.createSauces = (req, res, next) => {
  console.log("---->CONTENU: req.body - saucesCtrl");
  console.log(req.body);

  console.log("---->CONTENU: req.body.Sauces - saucesCtrl");
  console.log(req.body.Sauces);

  //JSON.parse créé un probleme
  const saucesObject = req.body.Sauces;
  console.log("/////// sauce sans Maj S cree un undefined");
  console.log(saucesObject);

  const autreSauce = new Sauces({
    ...saucesObject,
  });
  console.log("//////// autreSauce new Sauces");
  console.log(autreSauce);

  autreSauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce enregistré", contenu: req.body });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.readOneSauce = (req, res, next) => {
  console.log("/////////ROUTE: readOneSauce");
  console.log(req.params.id);
  console.log({ _id: req.params.id });

  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

/////// CONTROLLER UPDATE SAUCE
// exports.upDateSauce = (req, res, next) => {
//   const sauceObjet = req.file
//     ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   delete sauceObjet._userId;
//   Sauces.findOne({ _id: req.params.id })
//     .then((sauce) => {
//       if (sauce.userId != req.auth.userId) {
//         res.status(401).json({ message: "Action non autorisé" });
//       } else {
//         Sauces.updateOne(
//           { _id: req.params.id },
//           { ...sauceObjet, _id: req.params.id }
//         )
//           .then(() => res.status(200).json({ message: "Sauce modifié" }))
//           .catch((error) => res.status(401).json({ error }));
//       }
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };
exports.upDateSauce = (req, res, next) => {
  console.log("/////////ROUTE: upDateSauce");
  console.log(req.params.id);
  console.log({ _id: req.params.id });

  console.log("---->CONTENU: req.body");
  console.log(req.body);

  console.log("---->CONTENU: ...req.body");
  console.log({ ...req.body });

  Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce modifié" }))
    .catch((error) => res.status(400).json({ error }));
};

///////CONTROLLER DELETE SAUCE
// exports.deleteSauce = (req, res, next) => {
//   Sauces.findOne({ _id: req.params.id })
//     .then((sauce) => {
//       if (sauce.userId != req.auth.userId) {
//         res.status(401).json({ message: "Action non autorisé" });
//       } else {
//         const filename = sauce.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, () => {
//           Sauces.deleteOne({ _id: req.params.id })
//             .then(() => {
//               res.status(200).json({ message: "Sauce Supprimé" });
//             })
//             .catch((error) => res.status(401).json({ error }));
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
exports.deleteSauce = (req, res, next) => {
  console.log("//////////ROUTE: deleteSauce");
  console.log({ _id: req.params.id });

  Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

/////// CONTROLLER ALL SAUCES
exports.readAllSauces = (req, res, next) => {
  console.log("//////////ROUTE: readAllSauces");

  Sauces.find()
    .then((allSauces) => {
      res.status(200).json(allSauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

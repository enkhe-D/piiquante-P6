//const fs = require("fs");
//const bodyParser = require("body-parser");
const Sauces = require("../models/Sauces");

//CONTROLLER CREATE SAUCE
exports.createSauces = (req, res, next) => {
  console.log("////CONTENU: req.body - ctrl");
  console.log(req.body);

  console.log("--------CONTENU: req.body.sauces----------------");
  console.log(req.body.sauces);

  const sauceObjet = JSON.parse(req.body.sauces);

  console.log("------------CONTENU: sauceObject - ctrl-----------------");
  console.log(sauceObjet);

  console.log("---------fabriquer l url de l image-----------");
  console.log(req.protocol);
  console.log(req.get("host"));
  console.log(req.file.filename);

  const sauce = new Sauces({
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  console.log("------new sauce-------------");
  console.log(sauce);

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce enregistré", contenu: req.body });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.createSauces = (req, res, next) => {
//   console.log("---------------------------------------");
//   //const saucesObject = req.body.sauces;
//   delete req.body._id;
//   const sauces = new Sauces({
//     ...req.body,
//   });
//   sauces
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Sauce enregistré", contenu: req.body });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

/////// CONTROLLER ALL SAUCES
exports.readAllSauces = (req, res, next) => {
  console.log("---------------------------------------");
  console.log("ROUTE: readAllSauces");

  Sauces.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.readOneSauce = (req, res, next) => {
  console.log("---------------------------------------");
  console.log("ROUTE: readOneSauce");

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
exports.upDateOneSauce = (req, res, next) => {
  console.log("---------------------------------------");
  console.log("/////////ROUTE: upDateOneSauce");

  // const sauce = new Sauces({
  //   ...req.body,
  // });

  //faire la vérification de req.file

  Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() =>
      res.status(200).json({ message: "Sauce modifié", contenu: req.body })
    )
    .catch((error) => res.status(400).json({ error }));
};

// /////CONTROLLER DELETE SAUCE
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
exports.deleteOneSauce = (req, res, next) => {
  console.log("---------------------------------------");
  console.log("ROUTE: deleteOneSauce");

  Sauces.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Sauce supprimé" }))
    .catch((error) => res.status(400).json({ error }));
};

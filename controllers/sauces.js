const Sauce = require("../models/Sauce");
const fs = require("fs");
const bodyParser = require("body-parser");

exports.createSauces = (req, res, next) => {
  const objetSauce = JSON.parse(req.body.sauces);

  const autreSauce = new Sauce({
    ...objetSauce,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  autreSauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce enregistré" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//CONTROLLER ALL SAUCES
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

// exports.upDateOneSauce = (req, res, next) => {
//   // const objetSauce = req.file
//   //   ? {
//   //       ...JSON.parse(req.body.sauces),
//   //       imageUrl: `${req.protocol}://${req.get("host")}/images/${
//   //         req.file.filename
//   //       }`,
//   //     }
//   //   : { ...req.body };

//   // delete objetSauce._userId;
//   // Sauce.findOne({ _id: res.params.id })
//   //   .then((sauce) => {
//   //     if (sauce.userId != req.auth.userId) {
//   //       res.status(401).json({ message: "Action non autorisé" });
//   //     } else {
//   //       Sauce.updateOne(
//   //         { _id: req.params.id },
//   //         { ...objetSauce, _id: req.params.id }
//   //       )
//   //         .then(() => res.status(200).json({ message: "Objet modifié" }))
//   //         .catch((error) => res.status(401).json({ error }));
//   //     }
//   //   })
//   if (req.file) {
//     Sauce.findOne({ _id: req.params.id })
//       .then((objetSauce) => {
//         const filename = objetSauce.imageUrl.split("/images/")[1];
//         fs.unlink(`images/${filename}`, (error) => {
//           if (error) throw error;
//         });
//       })
//       .catch((error) => res.status(404).json({ error }));
//   } else {
//     console.log("FALSE");
//   }

//   const ficheObjetSauce = req.file
//     ? {
//         ...JSON.parse(req.body.objetSauce),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body };

//   Sauce.updateOne(
//     { _id: req.params.id },
//     { ...ficheObjetSauce, _id: req.params.id }
//   )
//     .then(() =>
//       res.status(200).json({
//         message: "objet modifié",
//       })
//     )
//     .catch((error) => res.status(404).json({ error }));
// };

exports.upDateOneSauce = (req, res, next) => {
  //voir l autre code
  console.log("-----req.file----------");
  console.log(req.file);
  console.log("---------------------------------------");

  Sauce.findOne({ _id: req.params.id })
    .then((sauceObjet) => {
      if (userIdParams === sauceObjet.userId) {
        if (req.file) {
          Sauce.findOne()
            .then((sauceObjet) => {
              const filename = sauceObjet.imageUrl.split("/images/")[1];

              fs.unlink(`images/${filename}`, (error) => {
                if (error) throw error;
              });
            })
            .catch((error) => res.status(404).json({ error }));
        } else {
          console.log("FALSE");
        }

        const sauceObjet = req.file
          ? {
              ...JSON.parse(req.body.sauces),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };

        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObjet, _id: req.params.id }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Objet modifié", contenu: sauceObjet })
          )
          .catch((error) => res.status(404).json({ error }));
      } else {
        console.log("Vous n'est pas autorisez a modifier cette sauce");
      }
    })
    .catch((error) => res.status(403).json({ error }));
};

//CONTROLLER DELETE ONE SAUCE

exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauceObjet) => {
      if (userIdParams === sauceObjet.userId) {
        const filename = sauceObjet.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé" }))
            .catch((error) => res.status(404).json({ error }));
        });
      } else {
        throw "Vous n'est pas autorisé a supprimer cette sauce";
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.deleteOneSauce = (req, res, next) => {
//   Sauce.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet supprimé" }))
//     .catch((error) => res.status(400).json({ error }));
// };

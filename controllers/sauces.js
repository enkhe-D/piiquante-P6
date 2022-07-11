const Sauces = require("../models/Sauces");
const fs = require("fs");
//const bodyParser = require("body-parser");

//CONTROLLER CREATE SAUCE
exports.createSauces = (req, res, next) => {
  console.log("////CONTENU: req.body - ctrl");
  console.log(req.body);

  console.log("--------CONTENU: req.body.sauces----------------");
  console.log(req.body.sauces);

  console.log("------CONTENU: POST req.file--------------");
  console.log(req.file);

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
  console.log("------ROUTE: put--------------");
  console.log(req.params.id);
  console.log({ _id: req.params.id });

  console.log("------CONTENU: req.file--------------");
  console.log(req.body);

  console.log("------CONTENU: PUT req.file--------------");
  console.log(req.file);

  if (req.file) {
    Sauces.findOne({ _id: req.params.id })
      .then((sauceObjet) => {
        console.log("--------res promesse objet----------");
        console.log(sauceObjet);
        const filename = sauceObjet.imageUrl.split("/images")[1];

        console.log("---filename-----------");
        console.log(filename);

        fs.unlink(`images/${filename}`, (error) => {
          if (error) throw error;
        });
      })
      .catch((error) => res.status(404).json({ error }));
  } else {
    console.log("false");
  }

  console.log("------CONTENU: req.body-------");
  console.log(req.body);

  console.log("------CONTENU: req.body.sauces-------");
  console.log(req.body.sauces);

  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  console.log("-----sauceObject------------");
  console.log(sauceObject);

  Sauces.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() =>
      res.status(200).json({ message: "Sauce modifié", contenu: sauceObject })
    )
    .catch((error) => res.status(404).json({ error }));
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

  Sauces.findOne({ _id: req.params.id })
    .then((sauceObject) => {
      const filename = sauceObject.imageUrl.split("/images")[1];

      userIdParamsUrl = req.originalUrl.split("=")[1];

      if (userIdParamsUrl === sauceObject.userId) {
        next();
      } else {
        throw "action non autorisé";
      }

      // fs.unlink(`images/${filename}`, () => {
      //   Sauces.deleteOne({ _id: req.params.id })
      //     .then(res.status(200).json({ message: "Sauce supprimé" }))
      //     .catch((error) => res.status(404).json({ error }));
      // });
    })
    .catch((error) => res.status(500).json({ error }));

  // Sauces.deleteOne({ _id: req.params.id })
  //   .then(() => res.status(200).json({ message: "Sauce supprimé" }))
  //   .catch((error) => res.status(400).json({ error }));
};

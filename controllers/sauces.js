const Sauce = require("../models/Sauce");
const fs = require("fs");
const bodyParser = require("body-parser");

// CONTROLLER CREATE SAUCES
exports.createSauces = (req, res, next) => {
  const createNewSauce = JSON.parse(req.body.sauce);

  delete createNewSauce._id;
  delete createNewSauce._userId;

  const sauce = new Sauce({
    ...createNewSauce,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Sauce enregistrée" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//CONTROLLER ALL SAUCES
exports.readAllSauces = (req, res, next) => {
  Sauce.find()
    .then((readAllSauces) => {
      res.status(200).json(readAllSauces);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

/////// CONTROLLER ONE SAUCE
exports.readOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((readOneSauce) => res.status(200).json(readOneSauce))
    .catch((error) => res.status(400).json({ error }));
};

/////// CONTROLLER UPDATE ONE SAUCE
exports.upDateOneSauce = (req, res, next) => {

  console.log('------ req.file updateimage ----------');
  console.log(req.file);

if(req.file){
  Sauce.findOne({_id: req.params.id})
  .then(updateImage =>{
    console.log('--------- updateImage ----------');
    console.log(updateImage);

    const filename = updateImage.imageUrl.split("/images/")[1];
    console.log('--------- filename ----------');
    console.log(filename);

    fs.unlink(`images/${filename}`, (error) =>{
      if(error) throw error;
      console.log('IMAGE MODIFIÉE');
    })

  })
  .catch(error => res.status(400).json({error}))
} else{
  console.log('klkc ne marche pas');
} 

const upDateOneSauce = req.file
  ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    }
  : { ...req.body };

  console.log('--------- req.body ----------');
  console.log(req.body);

  console.log('--------- req.body.sauce ----------');
  console.log(req.body.sauce);

  Sauce.updateOne(
    { _id: req.params.id },
    { ...upDateOneSauce, id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée" }))
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

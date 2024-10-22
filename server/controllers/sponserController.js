const Sponser = require('../model/Sponser');
const path = require('path');
const fs = require('fs');

const handleNewSponser = async (req, res) => {
  const name = req.body.name;
  const image = req.file;

  const imageUrl = image.destination + '/' + image.filename;

  if ((!name, !imageUrl)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Fill all required Credentials' });
  }
  try {
    const result = await Sponser.create({
      name: name,
      image: imageUrl,
    });
    res
      .status(201)
      .json({ status: 'success', message: 'New Sponser is posted' });
  } catch (error) {
    console.log(error);
  }
};
const getSponsers = async (req, res) => {
  try {
    const allSponsers = await Sponser.find();
    res.status(200).json(allSponsers);
  } catch (err) {
    res.send(err);
  }
};
// const deleteSponser = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const sponser = await Sponser.findOneAndDelete({
//       _id: id,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Sponser deleted ",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteSponser = async (req, res) => {
  const id = req.query.id;
  try {
    const sponser = await Sponser.findById(id);
    if (!sponser) {
      return res.status(404).json({
        status: 'error',
        message: 'Sponser not found',
      });
    }

    await Sponser.findByIdAndDelete(id);

    const imagePath = path.join(__dirname, '../', sponser.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log('Error deleting image:', err);
      } else {
        console.log('Image deleted successfully');
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Sponser and image deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = { handleNewSponser, getSponsers, deleteSponser };

const path = require('path');
const fs = require('fs');
const Partner = require('../model/Partner');

const handleNewPartner = async (req, res) => {
  const name = req.body.name;
  const image = req.file;

  const imageUrl = image.destination + '/' + image.filename;

  if ((!name, !imageUrl)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Fill all required Credentials' });
  }
  try {
    const result = await Partner.create({
      name: name,
      image: imageUrl,
    });
    res
      .status(201)
      .json({ status: 'success', message: 'New Partner is posted' });
  } catch (error) {
    console.log(error);
  }
};
const getPartners = async (req, res) => {
  try {
    const allPartners = await Partner.find();
    res.status(200).json(allPartners);
  } catch (err) {
    res.send(err);
  }
};
// const deletePartner = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const Partner = await Partner.findOneAndDelete({
//       _id: id,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Partner deleted ",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
const deletePartner = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const partner = await Partner.findById(id);
    if (!partner) {
      return res.status(404).json({
        status: 'error',
        message: 'Partner not found',
      });
    }

    await Partner.findByIdAndDelete(id);

    const imagePath = path.join(__dirname, '../', partner.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log('Error deleting image:', err);
      } else {
        console.log('Image deleted successfully');
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Partner and image deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = { handleNewPartner, getPartners, deletePartner };

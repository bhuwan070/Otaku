const path = require('path');
const fs = require('fs');
const Organizer = require('../model/Organizer');

const handleNewOrganizer = async (req, res) => {
  const name = req.body.name;
  const image = req.file;

  const imageUrl = image.destination + '/' + image.filename;

  if ((!name, !imageUrl)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Fill all required Credentials' });
  }
  try {
    const result = await Organizer.create({
      name: name,
      image: imageUrl,
    });
    res
      .status(201)
      .json({ status: 'success', message: 'New Organizer is posted' });
  } catch (error) {
    console.log(error);
  }
};
const getOrganizers = async (req, res) => {
  try {
    const allOrganizers = await Organizer.find();
    res.status(200).json(allOrganizers);
  } catch (err) {
    res.send(err);
  }
};

const deleteOrganizer = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    const organizer = await Organizer.findById(id);
    if (!organizer) {
      return res.status(404).json({
        status: 'error',
        message: 'Organizer not found',
      });
    }

    await Organizer.findByIdAndDelete(id);

    const imagePath = path.join(__dirname, '../', organizer.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.log('Error deleting image:', err);
      } else {
        console.log('Image deleted successfully');
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Organizer and image deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = { handleNewOrganizer, getOrganizers, deleteOrganizer };

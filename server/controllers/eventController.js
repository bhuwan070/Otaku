const Event = require('../model/Event');
const User = require('../model/User');
const path = require('path');
const fs = require('fs');

const handleNewEvent = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const name = req.body.name;
  const price = req.body.price;
  const googleform = req.body.googleform;
  const whatsapp = req.body.whatsapp;
  const poster = req.files.poster[0];
  // const rulebook = req.files.rulebook[0];

  const posterUrl = poster.destination + '/' + poster.filename;
  // const rulebookUrl = rulebook.destination + "/" + rulebook.filename;

  if ((!name, !poster)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Fill all required Credentials' });
  }
  try {
    const result = await Event.create({
      name: name,
      price: price,
      poster: posterUrl,
      formUrl: googleform,
      whatsappUrl: whatsapp,
      // rulebook: rulebookUrl,
    });
    res.status(201).json({ status: 'success', message: 'New Event is posted' });
  } catch (error) {
    console.log(error);
  }
};

const getEvents = async (req, res) => {
  try {
    const allEvents = await Event.find();

    // const currentEvents = allEvents.filter((event) => event.isActive === true);

    // res.status(200).json(currentEvents);
    res.status(200).json(allEvents);
  } catch (err) {
    res.send(err);
  }
};

const getOneEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findById({ _id: id });
    return res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// const deleteEvent = async (req, res) => {
//   const id = req.query.id;
//   try {
//     const event = await Event.deleteOne({
//       _id: id,
//     });
//     // const usersDeleteResult = await User.deleteMany({ event: id });
//     // console.log(`${usersDeleteResult.deletedCount} users deleted`);

//     if (!event) {
//       return res
//         .status(404)
//         .json({ status: "error", message: "Event not found" });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Event deleted and user associated with that event also deleted",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteEvent = async (req, res) => {
  const id = req.query.id;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Event not found' });
    }

    const posterPath = path.join(__dirname, '../', event.poster);

    if (fs.existsSync(posterPath)) {
      fs.unlink(posterPath, (err) => {
        if (err) {
          console.log('Error deleting poster image:', err);
        } else {
          console.log('Poster image deleted successfully');
        }
      });
    } else {
      console.log('Poster file not found, skipping deletion');
    }

    await Event.deleteOne({ _id: id });

    res.status(200).json({
      status: 'success',
      message: 'Event and associated poster deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const editRegistration = async (req, res) => {
  const id = req.query.id;

  try {
    const event = await Event.findOne({ _id: id });
    // console.log(event);

    const result = await Event.updateOne(
      {
        _id: id,
      },
      {
        isActive: event.isActive ? false : true,
      }
    );
    console.log(result);
    res.status(200).json({ status: 'success', message: 'Registration edited' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleNewEvent,
  getEvents,
  getOneEvent,
  deleteEvent,
  editRegistration,
};

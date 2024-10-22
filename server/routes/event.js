const express = require('express');
const router = express.Router();
const multer = require('multer');
const eventController = require('../controllers/eventController');

//storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'poster') {
      cb(null, 'uploads/events/posters');
    }
    // else if (file.fieldname === "rulebook") {
    //   cb(null, "uploads/events/rulebooks");
    // }
    else {
      cb(new Error('Invalid fieldname'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  '/',
  upload.fields([
    { name: 'poster', maxCount: 1 },
    // { name: "rulebook", maxCount: 1 },
  ]),
  eventController.handleNewEvent
);

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getOneEvent);
router.post('/changeeventstatus', eventController.editRegistration);
router.delete('/', eventController.deleteEvent);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const organizerController = require('../controllers/organizerController');

const storage = multer.diskStorage({
  destination: 'uploads/organizers',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', upload.single('file'), organizerController.handleNewOrganizer);
router.get('/', organizerController.getOrganizers);
router.delete('/', organizerController.deleteOrganizer);

module.exports = router;

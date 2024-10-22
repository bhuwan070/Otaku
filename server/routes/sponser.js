const express = require('express');
const router = express.Router();
const multer = require('multer');
const sponserController = require('../controllers/sponserController');
const Gallery = require('../model/Gallery');

const storage = multer.diskStorage({
  destination: 'uploads/sponsers',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', upload.single('file'), sponserController.handleNewSponser);
router.get('/', sponserController.getSponsers);
router.delete('/', sponserController.deleteSponser);

module.exports = router;

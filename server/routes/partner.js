const express = require('express');
const router = express.Router();
const multer = require('multer');
const partnerController = require('../controllers/partnerController');

const storage = multer.diskStorage({
  destination: 'uploads/partners',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', upload.single('file'), partnerController.handleNewPartner);
router.get('/', partnerController.getPartners);
router.delete('/', partnerController.deletePartner);

module.exports = router;

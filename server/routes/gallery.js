const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Gallery = require('../model/Gallery');

//storage
const storage = multer.diskStorage({
  destination: 'uploads/gallery',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.post('/', upload.array('files'), async (req, res) => {
  const event = req.body.name;
  const images = [];
  const fileUrls = req.files.map((file) => {
    const url = file.destination + '/' + file.filename;
    images.push(url);

    return {
      originalName: file.originalname,
      url: url,
    };
  });
  console.log(images);
  try {
    const result = await Gallery.create({
      event: event,
      images: images,
    });
    res.status(201).json({
      status: 'success',
      message: 'Gallery for an event is uploaded',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find();

    if (!gallery) {
      return res
        .status(401)
        .json({ status: 'error', message: 'No gallery to fetch' });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

//get images of one gallery by id
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const gallery = await Gallery.findById({ _id: id });
    return res.status(200).json(gallery);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.post('/:id', upload.array('files'), async (req, res) => {
  const id = req.params.id;
  const event = req.body.name;
  const images = [];
  const fileUrls = req.files.map((file) => {
    const url = file.destination + '/' + file.filename;
    images.push(url);

    return {
      originalName: file.originalname,
      url: url,
    };
  });
  console.log(images);
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        $push: { images: { $each: images } },
        event: event,
      },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({
        status: 'error',
        message: 'Gallery not found',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Gallery updated with new images',
      updatedGallery,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error,
    });
  }
});

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const gallery = await Gallery.findOneAndDelete({
//       _id: id,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Gallery deleted ",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        status: 'error',
        message: 'Gallery not found',
      });
    }

    if (gallery.images && gallery.images.length > 0) {
      gallery.images.forEach((image) => {
        console.log(image);
        const imagePath = path.join(__dirname, '../', image);

        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log(`Error deleting image ${image}:`, err);
            } else {
              console.log(`Image ${image} deleted successfully`);
            }
          });
        } else {
          console.log(`Image file ${image} not found, skipping deletion`);
        }
      });
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      message: 'Gallery and associated images deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
});

module.exports = router;

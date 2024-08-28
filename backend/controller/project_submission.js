const express = require('express');
const multer = require('multer');
const router = express.Router();

// Set up multer for file storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
    { name: 'pictures', maxCount: 10 }
]), (req, res) => {
  try {
    // Extract form data
    const { projectName, tagline, problem, challenges, technologies, links, videoDemo, platforms } = req.body;

    // Extract file info from memory
    const coverImage = req.files['coverImage'] ? req.files['coverImage'][0] : null;
    const logo = req.files['logo'] ? req.files['logo'][0] : null;
    const pictures = req.files['pictures'] || [];
    console.log(req.files)

    // // Log cover image details
    // if (coverImage) {
    //   console.log('Cover Image:');
    //   console.log(`Original Name: ${coverImage.originalname}`);
    //   console.log(`Size: ${coverImage.size} bytes`);
    //   console.log(`MIME Type: ${coverImage.mimetype}`);
    // }

    // // Log logo details
    // if (logo) {
    //   console.log('Logo:');
    //   console.log(`Original Name: ${logo.originalname}`);
    //   console.log(`Size: ${logo.size} bytes`);
    //   console.log(`MIME Type: ${logo.mimetype}`);
    // }

    // // Log pictures details
    // pictures.forEach((file, index) => {
    //   console.log(`Picture ${index + 1}:`);
    //   console.log(`Original Name: ${file.originalname}`);
    //   console.log(`Size: ${file.size} bytes`);
    //   console.log(`MIME Type: ${file.mimetype}`);
    // });

    // // Log other form data
    // console.log('Project Name:', projectName);
    // console.log('Tagline:', tagline);
    // console.log('Problem:', problem);
    // console.log('Challenges:', challenges);
    // console.log('Technologies:', technologies);
    // console.log('Links:', links);
    // console.log('Video Demo:', videoDemo);
    // console.log('Platforms:', platforms);

    // Respond with a success message
    res.status(200).json({ message: 'Project submitted successfully!' });
  } catch (err) {
    console.error('Error during file processing:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

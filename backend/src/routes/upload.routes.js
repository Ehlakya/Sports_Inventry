const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');

router.post('/', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File is too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Return the URL for the uploaded file
    const fileUrl = `/uploads/${req.file.filename}`;
    
    return res.status(200).json({
      message: 'File uploaded successfully',
      url: fileUrl
    });
  });
});

module.exports = router;

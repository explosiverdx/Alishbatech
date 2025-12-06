const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const { upload, uploadImageFromBuffer, deleteImage } = require('../../utils/cloudinary');

// All routes require authentication
router.use(authMiddleware);

// POST /api/admin/upload - Upload single image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No image file provided'
      });
    }

    // Upload to Cloudinary from buffer
    const result = await uploadImageFromBuffer(req.file.buffer, {
      public_id: `project_${Date.now()}`,
    });

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Failed to upload image: ' + error.message
    });
  }
});

// POST /api/admin/upload/multiple - Upload multiple images
router.post('/multiple', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: 'No image files provided'
      });
    }

    // Upload all files to Cloudinary
    const uploadPromises = req.files.map((file, index) =>
      uploadImageFromBuffer(file.buffer, {
        public_id: `project_${Date.now()}_${index}`,
      })
    );

    const results = await Promise.all(uploadPromises);

    const uploadedFiles = results.map(result => ({
      url: result.secure_url,
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    }));

    res.json({
      success: true,
      message: `${uploadedFiles.length} image(s) uploaded successfully`,
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      error: 'Failed to upload images: ' + error.message
    });
  }
});

// DELETE /api/admin/upload/:publicId - Delete image from Cloudinary
router.delete('/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    const result = await deleteImage(publicId);

    if (result.result === 'not found') {
      return res.status(404).json({
        error: 'Image not found'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully',
      result
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      error: 'Failed to delete image: ' + error.message
    });
  }
});

module.exports = router;


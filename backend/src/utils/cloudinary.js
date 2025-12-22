// Cloudinary configuration for image uploads
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
    }
  },
});

/**
 * Upload image to Cloudinary
 * @param {String} imagePath - Path to image file
 * @param {Object} options - Upload options
 * @returns {Promise} - Cloudinary upload result
 */
const uploadImage = async (imagePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'alishbatech',
      ...options,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Upload image from buffer (for multer)
 * @param {Buffer} buffer - Image buffer
 * @param {Object} options - Upload options
 * @returns {Promise} - Cloudinary upload result
 */
const uploadImageFromBuffer = async (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'alishbatech',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ],
      ...options,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 * @returns {Promise} - Deletion result
 */
const deleteImage = async (publicId) => {
  try {
    // Extract public_id from full URL if needed
    const id = publicId.includes('/') 
      ? publicId.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, '')
      : publicId;
    
    const result = await cloudinary.uploader.destroy(id);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

/**
 * Get optimized image URL
 * @param {String} publicId - Cloudinary public ID or URL
 * @param {Object} transformations - Image transformations
 * @returns {String} - Optimized image URL
 */
const getOptimizedUrl = (publicId, transformations = {}) => {
  const defaultTransformations = {
    quality: 'auto',
    fetch_format: 'auto',
    ...transformations,
  };
  
  return cloudinary.url(publicId, defaultTransformations);
};

module.exports = {
  cloudinary,
  upload,
  uploadImage,
  uploadImageFromBuffer,
  deleteImage,
  getOptimizedUrl,
};


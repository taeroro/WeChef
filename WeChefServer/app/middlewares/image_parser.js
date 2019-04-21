let multer = require('multer');
let cloudinary = require('cloudinary');
let cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

let userStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'user',
    transformation: [{ width: 500, height: 500, crop: 'fill', }],
});

let userPhotoUpload = multer({ storage: userStorage, }).single('image');

let recipeImageStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'recipe',
    transformation: [{ width: 500, height: 500, crop: 'fit', }],
});

let recipeImageUpload = multer({ storage: recipeImageStorage, }).single('image');

let reviewStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'review',
    transformation: [{ width: 500, height: 500, crop: 'fit', }],
});

let reviewImageUpload = multer({ storage: reviewStorage, }).single('image');


module.exports = {
    userPhotoUpload: userPhotoUpload,
    recipeImageUpload: recipeImageUpload,
    reviewImageUpload: reviewImageUpload,
};

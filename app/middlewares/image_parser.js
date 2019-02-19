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
    transformation: [{ widthn: 500, height: 500, cropt: 'limit', },],
});

let userPhotoUpload = multer({ storage: userStorage, }).single('image');

let recipeImageStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'recipe',
});

let recipeImageUpload = multer({ storage: recipeImageStorage, }).array('image', 10);

let reviewStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'review',
});

let reviewImageUpload = multer({ storage: reviewStorage, }).single('image');


module.exports = {
    userPhotoUpload: userPhotoUpload,
    recipeImageUpload: recipeImageUpload,
    reviewImageUpload: reviewImageUpload,
};
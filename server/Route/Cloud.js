const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '../.env.local' });
const express = require("express");
const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


router.get("/cloud", async (req, res) => {

    try {
        const receivedURL = './Route/trail.jpg'
        const results = await cloudinary.uploader.upload(receivedURL);
        console.log(results);
        const imageURL = await cloudinary.url(results.public_id, {
            transformation:[
                {
                    quality: "auto",
                    fetch_format: "auto",
                    gravity: "auto",
                }
            ]
        });
        res.status(200).send({ imageURL });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while uploading the image' });
    }

    // const url = cloudinary.url('wallpaperflare.com_wallpaper_5_igm9tz');
    // console.log(url);
    // res.status(200).send({ url });
});

module.exports = router;

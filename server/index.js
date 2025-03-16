require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const cloudinary = require("./cloudinary/cloudinary");

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get("/", (req, res) => {
    res.send("Welcome on this page");
});

app.post("/", async (req, res) => {  // Make this function async
    const { image } = req.body;
    const P_ID = image;
    if (!image) {
        return res.status(400).json({ error: "Image is required" });
    }

    try {
        const result = await cloudinary.uploader.upload(image, {  // Await the upload process
            upload_preset: "Practice",
            allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"]
        });

        console.log("Upload Successful:", result); // Log the result
        res.json({ message: "Image received successfully!", url: result.secure_url });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
});

app.listen(port, () => console.log(`App is listening on port ${port}`));

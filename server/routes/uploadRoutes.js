import express from "express"
import upload from "../config/upload.js"

const router = express.Router()

router.post("/", upload.single("image"), (req, res) => {
    if (req.file) {
        res.send({
            message: "Image uploaded",
            image: `/${req.file.path}`,
        })
    } else {
        res.status(400).send({ message: "No image uploaded" })
    }
})

export default router
